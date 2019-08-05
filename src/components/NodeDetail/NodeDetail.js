import React, { useState } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { IconButton } from 'office-ui-fabric-react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import styled from 'styled-components'
import get from 'lodash.get'
import { useEvent } from '../../hooks'
import NodeDetailView from './NodeDetailView'

const CustomPanel = styled(Panel)`
  & > .ms-Panel-main {
    transition: width 300ms ease-in-out;
  }
`

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
      <NodeDetailView
        department={department}
        description={description}
        url={url}
      />
    </CustomPanel>
  )
}
