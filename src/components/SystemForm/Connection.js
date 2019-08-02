import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { ConnectionReadWrite } from './ConnectionReadWrite'
import get from 'lodash.get'
import { IconButton } from 'office-ui-fabric-react'

const ConnectionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;
  margin-top: 12px;
  border: 1px solid rgb(138, 136, 134);
  box-sizing: border-box;
  border-radius: 1px;

  & > .ms-Dropdown-container {
    flex: 1;
    width: 100%;
    margin-right: 4px;
  }

  & > .ms-Button--icon {
    align-self: flex-end;
  }
`

export const Connection = props => {
  const { handleRemove, id, edit, addNodeForm, nodeFormErrors, setNodeFormErrors, existingSystems, updateNodeForm } = props
  const selectedTarget = get(addNodeForm, `connections[${id}].connectedTo.key`, null)
  const selectedType = get(addNodeForm, `connections[${id}].connectionType.key`, null)

  const selectedRead = get(addNodeForm, `connections[${id}].read`, true)
  const selectedWrite = get(addNodeForm, `connections[${id}].write`, false)

  const targetError = get(nodeFormErrors, `[${id}].target`)
  const typeError = get(nodeFormErrors, `[${id}].type`)

  useEffect(() => {
    if (!edit) {
      updateNodeForm({
        path: `connections[${id}].read`,
        value: true
      })
    }
  }, [updateNodeForm, id])

  return (
    <ConnectionContainer>
      <IconButton
        iconProps={{ iconName: 'ChromeClose' }}
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
      <Dropdown
        label='Connected To'
        placeholder={`What does this system connect to?`}
        options={existingSystems}
        errorMessage={targetError}
        selectedKey={selectedTarget}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectedTo`,
            value: { key: value.key, text: value.text }
          })
          if (`${id}` in nodeFormErrors) {
            const errors = {
              ...nodeFormErrors
            }
            delete errors[id]
            setNodeFormErrors(errors)
          }
        }}
      />
      <Dropdown
        label='Interface'
        options={[
          { key: 'builtin', text: 'Built In' },
          { key: 'custom', text: 'Custom' }
        ]}
        placeholder='How does this system connect?'
        selectedKey={selectedType}
        errorMessage={typeError}
        onChange={(event, value) => {
          updateNodeForm({
            path: `connections[${id}].connectionType`,
            value: { key: value.key, text: value.text, color: value.color }
          })
          if (`${id}` in nodeFormErrors) {
            const errors = {
              ...nodeFormErrors
            }
            delete errors[id]
            setNodeFormErrors(errors)
          }
        }}
      />
      <ConnectionReadWrite
        read={selectedRead}
        write={selectedWrite}
        onChange={(path, value) => {
          updateNodeForm({
            path: `connections[${id}].${path}`,
            value
          })
        }}
      />
    </ConnectionContainer>
  )
}
