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
  const { handleRemove, id, addNodeForm, nodeFormErrors, setNodeFormErrors, existingSystems, updateNodeForm } = props
  const selectedTarget = get(addNodeForm, `connections[${id}].connectedTo.key`, null)
  const selectedType = get(addNodeForm, `connections[${id}].connectionType.key`, null)
  const targetError = get(nodeFormErrors, `[${id}].target`)
  const typeError = get(nodeFormErrors, `[${id}].type`)

  return (
    <ConnectionContainer>
      <Dropdown
        label='Connected To'
        placeholder={`What does ${addNodeForm.name || 'this system'} connect to?`}
        options={existingSystems}
        errorMessage={targetError}
        selectedKey={selectedTarget}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectedTo`,
            value: { key: value.key, text: value.text }
          })
          setNodeFormErrors({
            ...nodeFormErrors,
            [id]: { type: null }
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
        placeholder='How does this system connect?'
        selectedKey={selectedType}
        errorMessage={typeError}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectionType`,
            value: { key: value.key, text: value.text, color: value.color }
          })
          setNodeFormErrors({
            ...nodeFormErrors,
            [id]: { type: null }
          })
        }}
      />
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        onClick={() => {
          const connection = get(addNodeForm, `connections[${id}]`, null)
          if (connection) {
            updateNodeForm({
              path: `connections[${id}]`,
              type: 'remove'
            })
          }
          handleRemove()
        }}
      />
    </ConnectionContainer>
  )
}
