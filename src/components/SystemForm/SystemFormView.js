import React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { ActionButton } from 'office-ui-fabric-react'
import { SystemType } from './SystemType'

const renderConnections = ({ connections, existingSystems, addNodeForm, updateNodeForm, setNodeFormErrors, nodeFormErrors }) => {
  return connections.map(conn => React.cloneElement(conn, { existingSystems, addNodeForm, updateNodeForm, setNodeFormErrors, nodeFormErrors }))
}

export const SystemFormView = props => {
  const {
    nodeFormErrors,
    existingSystems,
    setNodeFormErrors,
    addNodeForm,
    updateNodeForm,
    connections,
    addConnection,
    edit
  } = props
  return (
    <>
      <TextField
        label='Name'
        placeholder='Choose a name'
        errorMessage={nodeFormErrors.name}
        required
        onGetErrorMessage={(value => {
          const newSystem = String(value).toLowerCase()
          const nameExists = existingSystems.some(({ text }) => String(text).toLowerCase() === newSystem)
          if (nameExists && !edit) {
            setNodeFormErrors({
              ...nodeFormErrors,
              name: `The ${value} system already exists`
            })
          } else {
            if (nodeFormErrors.name) {
              const errors = {
                ...nodeFormErrors
              }
              delete errors.name
              setNodeFormErrors(errors)
            }
          }
        })}
        onChange={(event, value) => updateNodeForm({ path: 'name', value })}
        value={addNodeForm.name || ''}
      />
      <SystemType
        required
        errorMessage={nodeFormErrors.type}
        selectedKey={addNodeForm.type || null}
        onChange={(event, value) => {
          updateNodeForm({ path: 'type', value: value.key })
          if ('type' in nodeFormErrors) {
            const errors = {
              ...nodeFormErrors
            }
            delete errors.type
            setNodeFormErrors(errors)
          }
        }}
      />
      <TextField
        label='Department'
        placeholder='Was this built for another department?'
        onChange={(event, value) => updateNodeForm({ path: 'department', value })}
        value={addNodeForm.department || ''}
      />
      <TextField
        label='URL'
        placeholder='Is there a url to access this system?'
        onChange={(event, value) => updateNodeForm({ path: 'url', value })}
        value={addNodeForm.url || ''}
      />
      <TextField
        label='Description'
        placeholder='Enter some information others may want to know about this system'
        multiline
        rows={4}
        onChange={(event, value) => updateNodeForm({ path: 'description', value })}
        value={addNodeForm.description || ''}
      />
      {renderConnections({ connections, existingSystems, addNodeForm, updateNodeForm, setNodeFormErrors, nodeFormErrors })}
      <ActionButton
        onClick={addConnection}
        iconProps={{ iconName: 'Add' }}
      >
        Add Connection
      </ActionButton>
    </>
  )
}
