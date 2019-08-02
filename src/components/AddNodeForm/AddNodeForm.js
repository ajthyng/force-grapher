import React, { useState, useReducer } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { NodeManager, Graph } from '../../util'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { ActionButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import { useEvent } from '../../hooks'
import get from 'lodash.get'
import uuid from 'uuid/v4'
import set from 'lodash.set'
import unset from 'lodash.unset'
import { Connection } from './Connection'
import { SystemType } from './SystemType'

const addNodeReducer = (state, action) => {
  if (action.path === '') return {}
  const addNodeState = { ...state }
  switch (action.type) {
    case 'remove':
      unset(addNodeState, action.path)
      return addNodeState
    default:
      set(addNodeState, action.path, action.value)
      return addNodeState
  }
}

const connectionReducer = (connections, action) => {
  switch (action.type) {
    case 'add':
      const id = uuid()
      return [
        ...connections,
        <Connection
          key={id}
          id={id}
          handleRemove={() => action.dispatch({ type: 'remove', id })}
        />
      ]
    case 'remove':
      return connections.filter(({ key }) => key !== action.id)
    case 'reset':
      return []
    default:
      return connections
  }
}

const getSystems = () => {
  const nodes = NodeManager.getNodes()
  return nodes.map(node => ({ key: node.id, text: node.data.name }))
}

const renderConnections = ({ connections, existingSystems, addNodeForm, updateNodeForm, setNodeFormErrors, nodeFormErrors }) => {
  return connections.map(conn => React.cloneElement(conn, { existingSystems, addNodeForm, updateNodeForm, setNodeFormErrors, nodeFormErrors }))
}

const validate = (addNodeForm) => {
  const errors = {}
  if (!addNodeForm.type) {
    errors.type = 'A system type must be selected'
  }

  if (!addNodeForm.name) {
    errors.name = 'A system name is required'
  }

  if (addNodeForm.connections) {
    const keys = Object.keys(addNodeForm.connections || {})
    keys.forEach(key => {
      const target = get(addNodeForm, `connections[${key}].connectedTo.key`, null)
      const type = get(addNodeForm, `connections[${key}].connectionType.key`, null)

      if (!type) set(errors, `[${key}].type`, 'The connection must have a type selected')
      if (!target) set(errors, `[${key}].target`, 'You must select another system to connect to')
    })
  }

  return errors
}

export const AddNodeForm = props => {
  const [isOpen, setIsOpen] = useState(true)
  const [existingSystems, setExistingSystems] = useState(getSystems())
  const [nodeFormErrors, setNodeFormErrors] = useState({})
  const [connections, connDispatch] = useReducer(connectionReducer, [])

  const toggle = () => setIsOpen(!isOpen)
  const resetForm = () => updateNodeForm({ path: '', value: {} })
  const resetConnections = () => connDispatch({ type: 'reset' })

  const addConnection = () => {
    connDispatch({
      type: 'add',
      dispatch: connDispatch,
      existingSystems,
      addNodeForm,
      updateNodeForm
    })
  }

  const submitSystem = async () => {
    const errors = validate(addNodeForm)
    console.log(addNodeForm)
    if (Object.keys(errors).length > 0) {
      setNodeFormErrors({
        ...nodeFormErrors,
        ...errors
      })
      return
    }

    const connections = get(addNodeForm, 'connections', {})
    const data = {
      description: get(addNodeForm, 'description', ''),
      name: get(addNodeForm, 'name', ''),
      type: get(addNodeForm, 'type', ''),
      url: get(addNodeForm, 'url', ''),
      department: get(addNodeForm, 'department', '')
    }

    const node = Graph.makeNode({ connections, data })

    await Graph.addNode(node)

    broadcastNodeSave()
    resetConnections()
    resetForm()
  }

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
      isFooterAtBottom
      onRenderFooterContent={() => (
        <Stack horizontal horizontalAlign='space-between' tokens={{ childrenGap: 12 }}>
          <DefaultButton text='Cancel' onClick={dismiss} />
          <PrimaryButton text='Add System' onClick={submitSystem} />
        </Stack>
      )}
      type={PanelType.medium}
    >
      <TextField
        label='Name'
        placeholder='Choose a name'
        errorMessage={nodeFormErrors.name}
        required
        onGetErrorMessage={(value => {
          const newSystem = String(value).toLowerCase()
          if (existingSystems.some(({ text }) => String(text).toLowerCase() === newSystem)) {
            setNodeFormErrors({
              ...nodeFormErrors,
              name: `The ${value} system already exists`
            })
          } else {
            setNodeFormErrors({
              ...nodeFormErrors,
              name: null
            })
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
          setNodeFormErrors({
            ...nodeFormErrors,
            type: null
          })
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
    </Panel>
  )
}
