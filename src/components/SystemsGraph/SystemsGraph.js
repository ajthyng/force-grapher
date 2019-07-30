import React, { useReducer, useEffect, useState, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { NodeManager } from '../../util'
import { useEvent } from '../../hooks'
import get from 'lodash.get'

const systemsReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      const nodes = NodeManager.getNodes()
      return buildGraphData(nodes)
    default:
      return state
  }
}

const getLinkColor = (type) => {
  switch (type.key) {
    case 'oneway':
    case 'twoway':
      return '#A0A0A0'
    case 'custom':
      return '#04B080'
    case 'builtin':
      return '#303030'
    default:
      return '#A0A0A0'
  }
}

const buildGraphData = nodes => {
  if (!Array.isArray(nodes)) {
    return {
      nodes: [],
      links: []
    }
  }

  const graphNodes = nodes.map(node => ({
    ...node,
    id: node.key,
    name: node.name,
    color: '#303030'
  }))

  const graphLinks = nodes.reduce((links, node) => {
    const keys = Object.keys(get(node, 'connections', {}))
    keys.forEach(key => {
      const info = get(node, `connections[${key}].connectedTo`, {})
      const type = get(node, `connections[${key}].connectionType`, {})

      if (info.key && node.key) {
        links.push({
          source: node.key,
          target: info.key,
          color: getLinkColor(type),
          type
        })

        if (type.key === 'twoway') {
          links.push({
            source: info.key,
            target: node.key,
            color: getLinkColor(type),
            type
          })
        }
      }
    })
    return links
  }, [])

  return {
    nodes: graphNodes,
    links: graphLinks
  }
}

export const SystemsGraph = props => {
  const [systems, systemsDispatch] = useReducer(systemsReducer, buildGraphData(NodeManager.getNodes()))
  const [activeNode, setActiveNode] = useState()
  const systemsGraph = useRef()

  const updateGraph = () => {
    systemsDispatch({ type: 'update' })
  }
  const resetActiveNode = () => setActiveNode(null)

  useEffect(() => {
    systemsGraph.current.d3Force('charge').strength(-150)
    systemsGraph.current.zoom(4)
  }, [systems.links])

  useEffect(() => {
    if (activeNode) displayNodeDetails(activeNode)
  }, [activeNode])

  useEvent('save-node-entry', updateGraph)
  useEvent('deselect-active-node', resetActiveNode)

  const displayNodeDetails = useEvent('display-node-details')

  return (
    <ForceGraph2D
      ref={systemsGraph}
      graphData={systems}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={0.5}
      linkCurvature={0.25}
      nodeVal={4.5}
      onNodeClick={node => {
        if (node.id === get(activeNode, 'id', null)) {
          setActiveNode(null)
          return
        }
        setActiveNode(node)
      }}
      linkAutoColorBy={link => console.log('LINK: ', link)}
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
