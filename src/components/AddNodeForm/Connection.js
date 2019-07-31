import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import get from 'lodash.get'
import { IconButton } from 'office-ui-fabric-react'

const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .ms-Dropdown-container {
    flex: 1;
    margin-right: 4px;
  }

  & > .ms-Button--icon {
    align-self: flex-end;
  }
`

export const Connection = props => {
  const { handleRemove, id, addNodeForm, existingSystems, updateNodeForm } = props
  const selectedTarget = get(addNodeForm, `connections[${id}].connectedTo.key`, null)
  const selectedType = get(addNodeForm, `connections[${id}].connectionType.key`, null)

  return (
    <ConnectionContainer>
      <Dropdown
        label='Connected To'
        options={existingSystems}
        selectedKey={selectedTarget}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectedTo`,
            value: { key: value.key, text: value.text }
          })
        }}
      />
      <Dropdown
        label='Connection Type'
        options={[
          { key: 'oneway', text: 'One Way Interface' },
          { key: 'twoway', text: 'Two Way Interface' },
          { key: 'builtin', text: 'Built In Interface' },
          { key: 'custom', text: 'Custom Interface' }
        ]}
        selectedKey={selectedType}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectionType`,
            value: { key: value.key, text: value.text, color: value.color }
          })
        }}
      />
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        onClick={handleRemove}
      />
    </ConnectionContainer>
  )
}
