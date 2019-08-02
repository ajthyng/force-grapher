import React, { useState } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { IconButton } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import styled from 'styled-components'
import get from 'lodash.get'
import { useEvent } from '../../hooks'
import { NodeManager } from '../../util'
import NodeDetailView from './NodeDetailView'

const CustomPanel = styled(Panel)`
  & > .ms-Panel-main {
    transition: width 300ms ease-in-out;
  }
`
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

        acc.push(<Connection key={edge.node} to={to} read={read} write={write} type={type} />)
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
  const editSystem = useEvent('edit-system-panel')
  const deselectActiveNode = useEvent('deselect-active-node')
  const name = get(node, 'data.name', 'Very Unnamed System')
  const description = get(node, 'data.description', 'No description has been entered.')
  const department = get(node, 'data.department', 'No department has been entered.')
  const url = get(node, 'data.url', `${name} has no url`)

  const connections = parseConnections(node)
  const handleEdit = () => {
    editSystem(node)
    setIsOpen(false)
    deselectActiveNode()
  }

  return (
    <CustomPanel
      isOpen={isOpen}
      onDismiss={() => {
        deselectActiveNode()
        closePanel()
      }}
      onRenderHeader={(props) => {
        return (
          <Stack horizontal tokens={{ childrenGap: 12 }}>
            <Text variant='xLarge' style={{ marginLeft: 16, marginBottom: 12 }}>{props.headerText}</Text>
            <IconButton
              iconProps={{
                iconName: 'Edit'
              }}
              onClick={handleEdit}
            />
          </Stack>
        )
      }}
      isLightDismiss
      type={PanelType.customNear}
      customWidth={400}
      headerText={name}
    >
      {<NodeDetailView
        connections={connections}
        department={department}
        description={description}
        url={url}
      />}
    </CustomPanel>
  )
}
