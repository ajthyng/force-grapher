import React, { useReducer, useEffect, useState, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
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

const buildGraphData = (nodes, edges) => {
  const graphData = {
    nodes: [],
    links: []
  }
  if (!Array.isArray(nodes)) {
    return {
      nodes: [],
      links: []
    }
  }

  const nodeKeys = Object.keys(nodes || {})
  nodeKeys.forEach(key => {
    const node = nodes[key]
    console.log(node)
    graphData.nodes.push({
      id: node.id,
      type: node.data.type,
      name: node.data.name,
      data: {
        ...node.data
      },
      color: '#303030'
    })
  })

  const edgeKeys = Object.keys(edges || {})
  edgeKeys.forEach(nodeId => {
    const edgeList = edges[nodeId]

    edgeList.forEach(edge => {
      graphData.links.push({
        source: nodeId,
        target: edge.node,
        color: getLinkColor(get(edge, 'data.type.id')),
        type: get(edge, 'data.type', {})
      })
    })
  })

  return graphData
}

export const SystemsGraph = props => {
  const [systems, systemsDispatch] = useReducer(systemsReducer, buildGraphData(NodeManager.getNodes(), NodeManager.getEdges()))
  const [activeNode, setActiveNode] = useState()
  const systemsGraph = useRef()

  const updateGraph = () => {
    systemsDispatch({ type: 'update' })
  }
  const resetActiveNode = () => setActiveNode(null)
  const displayNodeDetails = useEvent('display-node-details')

  useEffect(() => {
    systemsGraph.current.d3Force('charge').strength(-150)
    systemsGraph.current.zoom(4)
  }, [systems.links])

  useEffect(() => {
    if (activeNode) displayNodeDetails(activeNode)
  }, [activeNode, displayNodeDetails])

  useEvent('save-node-entry', updateGraph)
  useEvent('deselect-active-node', resetActiveNode)

  return (
    <ForceGraph2D
      ref={systemsGraph}
      graphData={systems}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={0.5}
      linkCurvature={0.25}
      linkColor={link => link.color}
      nodeVal={4.5}
      onNodeClick={node => {
        if (node.id === get(activeNode, 'id', null)) {
          setActiveNode(null)
          return
        }
        setActiveNode(node)
      }}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const isActive = get(activeNode, 'id', null) === node.id
        const label = node.name
        const fontSize = 16 / globalScale
        ctx.font = `${isActive ? 'bold ' : ''}${fontSize}px Sans-Serif`
        const textWidth = ctx.measureText(label).width
        const innerSquareDimensions = [textWidth, fontSize].map(n => n + fontSize * 3)
        const outerSquareDimensions = [textWidth, fontSize].map(n => n + fontSize * (isActive ? 3.4 : 3.2))

        ctx.fillStyle = isActive ? '#005481' : node.color
        ctx.fillRect(node.x - outerSquareDimensions[0] / 2, node.y - outerSquareDimensions[1] / 2, ...outerSquareDimensions)
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fillRect(node.x - innerSquareDimensions[0] / 2, node.y - innerSquareDimensions[1] / 2, ...innerSquareDimensions)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = isActive ? '#005481' : node.color
        ctx.fillText(label, node.x, node.y)

        return ctx
      }}
    />
  )
}
