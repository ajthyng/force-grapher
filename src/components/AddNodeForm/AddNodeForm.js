import React, { useState, useReducer } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { NodeManager, Graph } from '../../util'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { ActionButton, PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react'
import { useEvent } from '../../hooks'
import get from 'lodash.get'
import uuid from 'uuid/v4'
import set from 'lodash.set'
import styled from 'styled-components'

const addNodeReducer = (state, action) => {
  if (action.path === '') return {}
  const addNodeState = { ...state }
  set(addNodeState, action.path, action.value)
  return addNodeState
}

// URL
// Department

const connectionReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const id = uuid()
      return {
        ...state,
        connections: [
          ...state.connections,
          <Connection
            key={id}
            id={id}
            addNodeForm={action.addNodeForm}
            updateNodeForm={action.updateNodeForm}
            handleRemove={() => action.dispatch({ type: 'remove', id })}
          />
        ]
      }
    case 'remove':
      return {
        ...state,
        connections: [
          ...state.connections.filter(({ key }) => key !== action.id)
        ]
      }
    case 'reset':
      return {
        connections: []
      }
    default:
      return state
  }
}

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

const Connection = props => {
  const { handleRemove, id, addNodeForm, existingSystems, updateNodeForm } = props
  const updateSystemsList = () => console.log('update')
  useEvent('save-node-entry', updateSystemsList)
  return (
    <ConnectionContainer>
      <Dropdown
        label='Connected To'
        options={existingSystems}
        selectedKey={get(addNodeForm, `connections[${id}].connectedTo`, null)}
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
        selectedKey={get(addNodeForm, `connections[${id}].connectionType`, null)}
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

const getSystems = () => {
  const nodes = NodeManager.getNodes()
  return nodes.map(node => ({ key: node.key, text: node.name }))
}

export const AddNodeForm = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [existingSystems, setExistingSystems] = useState(getSystems())
  const [state, connDispatch] = useReducer(connectionReducer, { connections: [] })

  const toggle = () => setIsOpen(!isOpen)
  const resetForm = () => updateNodeForm({ path: '', value: {} })
  const resetConnections = () => connDispatch({ type: 'reset' })
  const [addNodeForm, updateNodeForm] = useReducer(addNodeReducer, {})

  useEvent('toggle-left-panel', toggle)
  const dismiss = () => {
    resetForm()
    resetConnections()
    setIsOpen(false)
  }

  const updateExistingSystems = () => {
    const systems = getSystems()
    setExistingSystems(systems)
  }

  const broadcastNodeSave = useEvent('save-node-entry', updateExistingSystems)

  return (
    <Panel
      headerText='Add a New System Node'
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      type={PanelType.medium}
    >
      <TextField
        label='Name'
        onChange={(event, value) => updateNodeForm({ path: 'name', value })}
        value={addNodeForm.name || ''}
      />
      <Dropdown
        label='System Type'
        options={[
          { key: 'oncampus', text: 'On Campus' },
          { key: 'cloud', text: 'Cloud' },
          { key: 'external', text: 'External' }
        ]}
        placeholder='Select a type'
        selectedKey={addNodeForm.type || null}
        onChange={(event, value) => updateNodeForm({ path: 'type', value: value.key })}
      />
      <TextField
        label='Description'
        multiline
        rows={4}
        onChange={(event, value) => updateNodeForm({ path: 'description', value })}
        value={addNodeForm.description || ''}
      />
      {state.connections.map(conn => React.cloneElement(conn, { existingSystems }))}
      <ActionButton
        onClick={() => {
          connDispatch({
            type: 'add',
            dispatch: connDispatch,
            existingSystems,
            addNodeForm,
            updateNodeForm
          })
        }}
        iconProps={{ iconName: 'Add' }}
      >
        Add Connection
      </ActionButton>
      <Stack horizontal horizontalAlign='end' tokens={{ childrenGap: 12 }}>
        <DefaultButton text='Cancel' onClick={() => {
          dismiss()
        }} />
        <PrimaryButton text='Add System' onClick={() => {
          NodeManager.addNode({ key: (addNodeForm.name || '').toLowerCase(), ...addNodeForm })
          const connections = get(addNodeForm, 'connections', {})
          const data = {
            description: get(addNodeForm, 'description', ''),
            name: get(addNodeForm, 'name', ''),
            type: get(addNodeForm, 'type', '')
          }
          const node = Graph.makeNode({ connections, data })
          Graph.addNode(node)

          broadcastNodeSave()
          resetConnections()
          resetForm()
        }} />
      </Stack>
    </Panel>
  )
}
