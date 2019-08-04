import React, { useReducer, useEffect, useCallback, useState, useRef } from 'react'
import { Legend } from '../Legend'
import { Network, Graph } from '../../util'
import { useEvent } from '../../hooks'
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

  const graphContainer = useRef()
  const graph = useRef()

  const updateGraph = async () => {
    const nodes = await Graph.getNodes()
    const edges = await Graph.getEdges()
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

  useEffect(() => {
    updateGraph()
  }, [])

  const resetActiveNode = () => setActiveNode(null)
  const displayNodeDetails = useEvent('display-node-details')
  useEvent('node-search-result', updateSearchResults)

  const handleNodeSelect = useCallback(params => {
    const node = get(params, `nodes[0]`, null)
    if (params.nodes.length > 1) return

    if (node) {
      if (!graph.current.network.isCluster(node)) {
        const matchingNode = systems.nodes.find(({ id }) => id === node)
        if (matchingNode) {
          setActiveNode(matchingNode)
        }
      }
    }
  }, [systems.nodes])

  useEffect(() => {
    if (activeNode) displayNodeDetails(activeNode)
  }, [activeNode, displayNodeDetails])

  useEvent('save-node-entry', updateGraph)
  useEvent('deselect-active-node', resetActiveNode)

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
      graph.current.network.on('dragEnd', event => {
        if (event.nodes.length > 0) {
          const node = get(event, 'nodes[0]')
          const { x, y } = get(event, 'pointer.canvas', {})
          graph.current.updateNodePosition({
            node,
            x,
            y
          })
        }
      })

      document.addEventListener('contextmenu', e => e.preventDefault(), false)
    } else {
      graph.current.network.off('selectNode', handleNodeSelect)
      graph.current.network.on('selectNode', handleNodeSelect)

      graph.current.setData(systems)
    }
  }, [systems, handleNodeSelect])

  return (
    <>
      <div style={{ overflow: 'hidden', height: 'calc(100% - 44px)' }} ref={graphContainer} id='graph' />
      <Legend />
    </>
  )
}
