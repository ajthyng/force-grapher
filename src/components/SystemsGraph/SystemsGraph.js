import React, { useReducer, useEffect, useCallback, useState, useRef } from 'react'
import { Legend } from '../Legend'
import { Network, Graph, Subject } from '../../util'
import { useEvent, useEventListener } from '../../hooks'
import get from 'lodash.get'

const systemsReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      const nodes = action.nodes
      const edges = action.edges
      return buildGraphData(nodes, edges)
    default:
      return state
  }
}

const getLinkColor = (type) => {
  switch (type) {
    case 'custom':
      return '#005481'
    case 'builtin':
      return '#9e6614'
    default:
      return '#A0A0A0'
  }
}

const getShape = (type) => {
  switch (type) {
    case 'cloud':
      // Cloud shape
      return { shape: 'icon', shapeProperties: { size: 25 }, icon: { face: 'Ionicons', code: '\uf2c9', color: '#FFF' } }
    case 'external':
      return { shape: 'icon', shapeProperties: { size: 25 }, icon: { face: 'Ionicons', code: '\uf381', color: '#FFF' } }
    case 'oncampus':
    default:
      // Square Shape
      return { shape: 'icon', shapeProperties: { size: 25 }, icon: { face: 'Ionicons', code: '\uf384', color: '#FFF' } }
  }
}

const getArrowDirection = (edge) => {
  const read = get(edge, 'data.read')
  const write = get(edge, 'data.write')

  if (read && write) return 'from, to'
  return 'to'
}

const buildGraphData = (nodes, edges) => {
  const graphData = {
    nodes: [],
    edges: []
  }

  const nodeKeys = Object.keys(nodes || {})
  nodeKeys.forEach(key => {
    const node = nodes[key]

    graphData.nodes.push({
      id: node.id,
      type: node.data.type,
      ...getShape(node.data.type),
      label: node.data.name,
      edges: node.edges,
      font: {
        color: '#363534',
        strokeWidth: 2,
        strokeColor: '#FFFFFF'
      },
      shadow: {
        enabled: true,
        size: 4,
        x: 1,
        y: 1
      },
      data: {
        ...node.data
      },
      color: '#FFFFFF',
      x: get(node, 'position.x'),
      y: get(node, 'position.y')
    })
  })

  const edgeKeys = Object.keys(edges || {})
  edgeKeys.forEach(nodeId => {
    const edgeList = edges[nodeId]

    edgeList.forEach(edge => {
      if (!edge) return
      graphData.edges.push({
        from: nodeId,
        to: edge.node,
        smooth: {
          enabled: true,
          type: 'cubizBezier',
          roundness: 0.15
        },
        color: {
          color: getLinkColor(get(edge, 'data.type.id')),
          hover: '#501214',
          highlight: '#501214'
        },
        dashes: get(edge, 'data.type.id') === 'custom',
        type: get(edge, 'data.type', {}),
        arrows: getArrowDirection(edge, nodeId)
      })
    })
  })

  return graphData
}

export const SystemsGraph = () => {
  const [systems, systemsDispatch] = useReducer(systemsReducer, { nodes: [], edges: [] })
  const [activeNode, setActiveNode] = useState()
  const viewPort = useRef({})
  const lastAdded = useRef()
  const selectedNodes = useRef([])
  const holdingShift = useRef(false)

  const graphContainer = useRef()
  const graph = useRef()

  const updateGraph = async () => {
    const nodes = await Graph.getNodes()
    const edges = await Graph.getEdges()
    lastAdded.current = null
    selectedNodes.current = []
    holdingShift.current = false
    systemsDispatch({ type: 'update', nodes, edges })
  }

  const updateSearchResults = (results) => {
    if (graph.current.network) {
      if (results.length <= 0) {
        const selected = graph.current.network.getSelectedNodes()
        graph.current.network.unselectAll()

        // Were there nodes selected? Zoom back out.
        if (selected.length > 0) {
          graph.current.network.fit({
            animation: {
              duration: 300,
              easingFunction: 'easeInOutQuad'
            }
          })
        }
        return
      }
      graph.current.network.selectNodes(results)
      graph.current.network.fit({
        nodes: results,
        animation: {
          duration: 300,
          easingFunction: 'easeInOutQuad'
        }
      })
    }
  }

  const deleteSelectedNodes = useCallback(async () => {
    await Graph.deleteNodes(selectedNodes.current)
    viewPort.current.scale = graph.current.network.getScale()
    viewPort.current.position = graph.current.network.getViewPosition()
    selectedNodes.current = []
    broadcastGraphDataUpdate()
  }, [])

  useEffect(() => {
    updateGraph()
  }, [])

  const resetActiveNode = () => setActiveNode(null)
  const displayNodeDetails = useEvent('display-node-details')
  useEvent('node-search-result', updateSearchResults)

  const handleNodeSelect = useCallback(params => {
    const node = get(params, `nodes[0]`, null)
    if (params.nodes.length > 1 || holdingShift) return

    if (node) {
      if (!graph.current.network.isCluster(node) && !holdingShift.current) {
        const matchingNode = systems.nodes.find(({ id }) => id === node)
        if (matchingNode) {
          setActiveNode(matchingNode)
        }
      }
    }
  }, [systems.nodes])

  const handleNodeClick = useCallback(params => {
    const node = graph.current.network.getNodeAt(params.pointer.DOM)
    if (node) {
      if (!graph.current.network.isCluster(node) && !holdingShift.current) {
        const matchingNode = systems.nodes.find(({ id }) => id === node)
        if (matchingNode) {
          setActiveNode(matchingNode)
        }
      }

      if (holdingShift.current && params.nodes[0]) {
        const selected = [...selectedNodes.current, params.nodes[0]]
        selectedNodes.current = selected
        graph.current.network.selectNodes(selected)
      }
    } else {
      selectedNodes.current = []
    }
  }, [systems.nodes])

  const handleNodeDrag = useCallback(event => {
    if (event.nodes.length > 0) {
      const positions = graph.current.network.getPositions(event.nodes)
      Graph.updateBatchNodePositions(positions)
    }
  }, [])

  const handleKeyDown = useCallback(event => {
    if (event.keyCode === 46 || event.keyCode === 8) { // Delete or Backspace
      Subject.next('delete-selected-nodes')
    }

    if (event.ctrlKey && event.keyCode === 70) { // Control + f Shortcut
      event.preventDefault()
      Subject.next('focus-search-bar')
    }

    if (event.shiftKey && !holdingShift.current) {
      holdingShift.current = true
    }
  }, [holdingShift])

  const handleKeyUp = useCallback(event => {
    if (!event.shiftKey && holdingShift.current) {
      holdingShift.current = false
    }
  }, [holdingShift])

  useEventListener('keydown', handleKeyDown)
  useEventListener('keyup', handleKeyUp)

  useEffect(() => {
    if (activeNode) displayNodeDetails(activeNode)
  }, [activeNode, displayNodeDetails])

  const updateLastAdded = (node) => {
    lastAdded.current = node
  }

  const broadcastGraphDataUpdate = useEvent('graph-data-updated', updateGraph)
  useEvent('deselect-active-node', resetActiveNode)
  useEvent('node-added', updateLastAdded)
  useEvent('delete-selected-nodes', deleteSelectedNodes)

  useEffect(() => {
    const options = {
      autoResize: false,
      interaction: {
        hover: true,
        hoverConnectedEdges: true
      },
      physics: {
        enabled: false
      }
    }

    if (!graph.current) {
      const start = new Date()
      const systemGraph = Network
        .inContainer(graphContainer.current)
        .withEdges(systems.edges)
        .withNodes(systems.nodes)
        .withOptions(options)
        .build()

      console.log(`Network Build Time: ${new Date() - start}ms`)
      graph.current = systemGraph

      graph.current.network.on('selectNode', handleNodeSelect)
      graph.current.network.on('dragEnd', handleNodeDrag)
      graph.current.network.on('click', handleNodeClick)

      document.addEventListener('contextmenu', e => e.preventDefault(), false)
    } else {
      graph.current.network.off('selectNode')
      graph.current.network.off('dragEnd')
      graph.current.network.off('click')

      graph.current.network.on('selectNode', handleNodeSelect)
      graph.current.network.on('click', handleNodeClick)
      graph.current.network.on('dragEnd', handleNodeDrag)

      console.log('redrawing')
      graph.current.setData(systems)
      if (viewPort.current.position && viewPort.current.scale) {
        graph.current.network.moveTo({
          position: viewPort.current.position,
          scale: viewPort.current.scale
        })
        viewPort.current = {}
      }

      if (lastAdded.current) {
        graph.current.network.focus(lastAdded.current, {
          scale: 1,
          animation: {
            duration: 300,
            easingFunction: 'easeInOutCubic'
          }
        })
        graph.current.network.selectNodes([lastAdded.current])
      }
    }
  }, [systems, handleNodeClick, handleNodeDrag, handleNodeSelect])

  return (
    <>
      <div style={{ overflow: 'hidden', height: 'calc(100% - 44px)' }} ref={graphContainer} id='graph' />
      <Legend />
    </>
  )
}
