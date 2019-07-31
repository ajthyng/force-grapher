import React, { useState } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { useEvent } from '../../hooks'
import { NodeManager } from '../../util'
import get from 'lodash.get'

const parseConnections = (node) => {
  if (!node) return []
  const edges = NodeManager.getEdges()
  const nodes = NodeManager.getNodesObject()

  const edgeKeys = Object.keys(edges || {})
  return edgeKeys.reduce((acc, cur) => {
    const nodeEdges = edges[cur]
    nodeEdges
      .filter(edge => edge.node === node.id)
      .forEach(edge => {
        const to = get(nodes, `[${cur}].data.name`)

        const type = get(edge, 'data.type.label')
        const read = get(edge, 'data.read')
        const write = get(edge, 'data.write')

        acc.push(<Connection to={to} read={read} write={write} type={type} />)
      })
    return acc
  }, [])
}

const Connection = ({ to, type, read, write }) => {
  let readWriteStatus = ''
  if (read && write) {
    readWriteStatus = '(Read and Write)'
  } else if (read) {
    readWriteStatus = '(Read)'
  } else if (write) {
    readWriteStatus = '(Write)'
  }
  return (
    <Text>{to} - {type} {readWriteStatus}</Text>
  )
}

export const NodeDetail = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [node, setNode] = useState(null)
  const displayNode = (node) => {
    setNode(node)
    setIsOpen(true)
  }
  const closePanel = () => setIsOpen(false)

  useEvent('display-node-details', displayNode)
  const deselectActiveNode = useEvent('deselect-active-node')
  const name = get(node, 'name', 'Very Unnamed System')
  const description = get(node, 'data.description', 'No description has been entered.')
  const department = get(node, 'data.department', 'No department has been entered.')
  const url = get(node, 'data.url', `${name} has no url`)

  const connections = parseConnections(node)

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={() => {
        deselectActiveNode()
        closePanel()
      }}
      isLightDismiss
      type={PanelType.customNear}
      customWidth={400}
      headerText={name}
    >
      <Stack tokens={{ childrenGap: 8 }}>
        <Stack tokens={{ childrenGap: 4 }}>
          <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Description</Text>
          <Text>{description}</Text>
        </Stack>
        <Stack tokens={{ childrenGap: 4 }}>
          <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Department</Text>
          <Text>{department}</Text>
        </Stack>
        <Stack tokens={{ childrenGap: 4 }}>
          <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>URL</Text>
          <Text>{url}</Text>
        </Stack>
        <Stack>
          <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Connections</Text>
          {connections}
        </Stack>
      </Stack>
    </Panel>
  )
}
