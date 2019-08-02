import React, { useReducer, useEffect, useState, useRef } from 'react'
import { Network, DataSet } from 'vis-network'
import { NodeManager } from '../../util'
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
      return '#4b721d'
    case 'builtin':
      return '#deb407'
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
        color: getLinkColor(get(edge, 'data.type.id')),
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

  const network = useRef()
  const graph = useRef()

  const updateGraph = () => {
    systemsDispatch({ type: 'update' })
  }
  const resetActiveNode = () => setActiveNode(null)
  const displayNodeDetails = useEvent('display-node-details')

  useEffect(() => {
    if (activeNode) displayNodeDetails(activeNode)
  }, [activeNode, displayNodeDetails])

  useEvent('save-node-entry', updateGraph)
  useEvent('deselect-active-node', resetActiveNode)

  console.log('render graph')
  useEffect(() => {
    const nodes = new DataSet(systems.nodes)
    const edges = new DataSet(systems.edges)
    console.log('graph use effect')
    const options = {
      physics: {
        solver: 'repulsion'
      },
      autoResize: false
    }

    const data = { nodes, edges }
    if (!network.current) {
      network.current = new Network(graph.current, data, options)
      network.current.on('oncontext', event => {
        const node = network.current.getNodeAt(event.pointer.DOM)
        if (network.current.isCluster(node)) {
          network.current.openCluster(node)
        } else {
          const matchingNode = systems.nodes.find(({ id }) => id === node)
          if (!matchingNode) return
          network.current.clusterByConnection(node, { clusterNodeProperties: { label: matchingNode.data.name } })
        }
      })
      network.current.on('selectNode', params => {
        const node = get(params, `nodes[0]`, null)
        if (node) {
          if (!network.current.isCluster(node)) {
            const matchingNode = systems.nodes.find(({ id }) => id === node)
            if (matchingNode) {
              setActiveNode(matchingNode)
            }
          }
        }
      })
      document.addEventListener('contextmenu', e => e.preventDefault(), false)
    } else {
      network.current.setData(data)
    }
  }, [systems])

  return <div style={{ overflow: 'hidden', flex: 1 }} ref={graph} id='graph' />
}
