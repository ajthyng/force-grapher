import React, { useState } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { useEvent } from '../../hooks'
import { NodeManager } from '../../util'
import get from 'lodash.get'

const pullNodeConnections = (node, target) => {
  const connections = get(node, 'connections', {})
  const keys = Object.keys(connections)
  const nodeConnections = keys.reduce((acc, cur) => {
    let to = get(node, `connections[${cur}].connectedTo.text`, '')
    const type = get(node, `connections[${cur}].connectionType.text`, '')
    if (target && to === target) {
      to = get(node, 'name', '')
      acc.push(<Connection to={to} type={type} />)
      return acc
    } else if (!target) {
      acc.push(<Connection to={to} type={type} />)
    }

    return acc
  }, [])

  return nodeConnections
}

const parseConnections = (node) => {
  if (!node) return []
  const nodes = NodeManager.getNodes()
  const connectionsFromThisNode = pullNodeConnections(node)

  const connectionsToThisNode = nodes.reduce((acc, cur) => {
    const connections = pullNodeConnections(cur, node.name)
    return [...acc, ...connections]
  }, [])

  return [...connectionsFromThisNode, ...connectionsToThisNode]
}

const Connection = ({ to, type }) => {
  return (
    <Text>{to} - {type}</Text>
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
  const name = get(node, 'name', '')
  const description = get(node, 'description', '')
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
        <Stack>
          <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Connections</Text>
          {connections}
        </Stack>
      </Stack>
    </Panel>
  )
}
