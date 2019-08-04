import React, { useReducer, useEffect, useCallback, useState, useRef } from 'react'
import { Network, NodeManager } from '../../util'
import { useEvent } from '../../hooks'
import get from 'lodash.get'

const systemsReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      const nodes = NodeManager.getNodes()
      const edges = NodeManager.getEdges()
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
      return { size: 40, widthConstraint: { minimum: 40, maximum: 100 } }
    case 'external':
      return { shape: 'circle', size: 40, widthConstraint: { minimum: 40, maximum: 100 } }
    case 'oncampus':
    default:
      return { shape: 'box', size: 40, widthConstraint: { minimum: 40, maximum: 100 } }
  }
}

const buildGraphData = (nodes, edges) => {
  const graphData = {
    nodes: [],
    edges: []
  }
  if (!Array.isArray(nodes)) {
    return {
      nodes: [],
      edges: []
    }
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
      shadow: {
        enabled: true,
        size: 4,
        x: 1,
        y: 1
      },
      data: {
        ...node.data
      },
      color: '#FFFFFF'
    })
  })

  const edgeKeys = Object.keys(edges || {})
  edgeKeys.forEach(nodeId => {
    const edgeList = edges[nodeId]

    edgeList.forEach(edge => {
      graphData.edges.push({
        from: nodeId,
        to: edge.node,
        color: {
          color: getLinkColor(get(edge, 'data.type.id')),
          hover: '#501214',
          highlight: '#501214'
        },
        dashes: get(edge, 'data.type.id') === 'custom',
        type: get(edge, 'data.type', {}),
        arrows: 'to'
      })
    })
  })

  return graphData
}

export const SystemsGraph = () => {
  const [systems, systemsDispatch] = useReducer(systemsReducer, buildGraphData(NodeManager.getNodes(), NodeManager.getEdges()))
  const [activeNode, setActiveNode] = useState()

  const graphContainer = useRef()
  const graph = useRef()

  const updateGraph = () => {
    systemsDispatch({ type: 'update' })
  }
  const resetActiveNode = () => setActiveNode(null)
  const displayNodeDetails = useEvent('display-node-details')

  const handleRightClick = useCallback(event => {
    const node = graph.current.network.getNodeAt(event.pointer.DOM)
    if (graph.current.network.isCluster(node)) {
      graph.current.network.openCluster(node)
    } else {
      const matchingNode = systems.nodes.find(({ id }) => id === node)
      if (!matchingNode) return
      graph.current.network.clusterByConnection(node, { clusterNodeProperties: { label: matchingNode.data.name } })
    }
  }, [systems])

  const handleNodeSelect = useCallback(params => {
    const node = get(params, `nodes[0]`, null)
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
      }
    }

    if (!graph.current) {
      const systemGraph = Network
        .inContainer(graphContainer.current)
        .withEdges(systems.edges)
        .withNodes(systems.nodes)
        .withOptions(options)
        .build()

      graph.current = systemGraph

      graph.current.network.on('oncontext', handleRightClick)
      graph.current.network.on('selectNode', handleNodeSelect)

      document.addEventListener('contextmenu', e => e.preventDefault(), false)
    } else {
      graph.current.network.off('oncontext', handleRightClick)
      graph.current.network.off('selectNode', handleNodeSelect)
      graph.current.network.on('oncontext', handleRightClick)
      graph.current.network.on('selectNode', handleNodeSelect)

      graph.current.setData(systems)
    }
  }, [systems, handleNodeSelect, handleRightClick])

  return <div style={{ overflow: 'hidden', flex: 1 }} ref={graphContainer} id='graph' />
}
