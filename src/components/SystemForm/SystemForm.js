import React, { useState, useReducer } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { NodeManager, Graph } from '../../util'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import { useEvent } from '../../hooks'
import get from 'lodash.get'
import uuid from 'uuid/v4'
import set from 'lodash.set'
import unset from 'lodash.unset'
import { Connection } from './Connection'
import { Network } from '../../util/Network'
import { SystemFormView } from './SystemFormView'

const makeConnections = (system, nodes) => {
  const connections = {}
  system.edges.forEach(edge => {
    connections[edge.id] = {
      read: edge.data.read,
      write: edge.data.write,
      connectionType: {
        key: edge.data.type.id,
        text: edge.data.type.label
      },
      connectedTo: {
        key: edge.id,
        text: get(nodes.filter(node => node.id === edge.id), '[0].data.name', '')
      }
    }
  })
  return connections
}

const checkURL = url => {
  if (!url) return
  try {
    const checkedURL = new URL(url)
    if (checkedURL) return null
  } catch (err) {
    return err.message
  }
}

const makeFormState = system => {
  const { network, getNodes } = Network.build()
  const nodes = network.getConnectedNodes(system.id)

  const connectedNodes = getNodes().filter(({ id }) => nodes.includes(id))

  const formState = {
    name: get(system, 'data.name'),
    id: get(system, 'id'),
    type: get(system, 'data.type'),
    department: get(system, 'data.department'),
    url: get(system, 'data.url'),
    description: get(system, 'data.description'),
    connections: makeConnections(system, connectedNodes)
  }
  return formState
}

const addNodeReducer = (state, action) => {
  if (action.path === '') return {}
  const addNodeState = { ...state }
  switch (action.type) {
    case 'remove':
      unset(addNodeState, action.path)
      return addNodeState
    case 'edit':
      return { ...action.formState }
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
    case 'edit':
      const connKeys = Object.keys(action.connections)
      return connKeys.map(key => {
        const id = key
        const dispatch = get(action, 'dispatch', null)

        if (!dispatch || !id) return null

        return (
          <Connection
            edit
            key={id}
            id={id}
            handleRemove={() => dispatch({ type: 'remove', id })}
          />
        )
      }).filter(item => item)
    default:
      return connections
  }
}

const getSystems = () => {
  const nodes = NodeManager.getNodes()
  return nodes.map(node => ({ key: node.id, text: node.data.name })).sort((a, b) => {
    if (a.text < b.text) return -1
    if (a.text > b.text) return 1
    return 0
  })
}

const validate = (addNodeForm, nodeFormErrors) => {
  let errors = {}
  if (nodeFormErrors) {
    errors = {
      ...nodeFormErrors
    }
  }

  if (!addNodeForm.type) {
    errors.type = 'A system type must be selected'
  }

  if (!addNodeForm.name) {
    errors.name = 'A system name is required'
  }

  if (addNodeForm.url) {
    const error = checkURL(addNodeForm.url)
    console.log(errors)
    if (error) errors.url = error
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

export const SystemForm = (props) => {
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [addNodeForm, updateNodeForm] = useReducer(addNodeReducer, {})
  const [existingSystems, setExistingSystems] = useState(getSystems())
  const [nodeFormErrors, setNodeFormErrors] = useState({})
  const [connections, connDispatch] = useReducer(connectionReducer, [])

  const toggle = () => setIsOpen(!isOpen)
  const resetForm = () => updateNodeForm({ path: '', value: {} })
  const resetConnections = () => connDispatch({ type: 'reset' })

  const handleEditSystem = (system) => {
    const formState = makeFormState(system)
    connDispatch({
      type: 'edit',
      connections: formState.connections || {},
      dispatch: connDispatch
    })
    updateNodeForm({ type: 'edit', formState })
    setEdit(true)
    setIsOpen(true)
  }

  useEvent('edit-system-panel', handleEditSystem)

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
    const errors = validate(addNodeForm, nodeFormErrors)
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

    let id = null
    if (edit) {
      const node = await Graph.makeNode({ id: addNodeForm.id, connections, data })
      id = addNodeForm.id
      await Graph.addNode(node)
    } else {
      const node = await Graph.makeNode({ connections, data })
      id = node.id
      await Graph.addNode(node)
    }

    broadcastNodeSave()
    nodeAdded(id)
    resetConnections()
    resetForm()
    if (edit) {
      dismiss()
    }
  }

  useEvent('toggle-left-panel', toggle)
  const dismiss = () => {
    resetForm()
    resetConnections()
    setIsOpen(false)
    setEdit(false)
  }

  const updateExistingSystems = () => {
    const systems = getSystems()
    setExistingSystems(systems)
  }

  const broadcastNodeSave = useEvent('save-node-entry', updateExistingSystems)
  const nodeAdded = useEvent('node-added')

  return (
    <Panel
      headerText={`${edit ? 'Edit' : 'Add'} System`}
      isOpen={isOpen}
      onDismiss={dismiss}
      isFooterAtBottom
      onRenderFooterContent={() => (
        <Stack horizontal horizontalAlign='space-between' tokens={{ childrenGap: 12 }}>
          <DefaultButton text='Cancel' onClick={dismiss} />
          <PrimaryButton text='Save System' onClick={submitSystem} />
        </Stack>
      )}
      type={PanelType.medium}
    >
      <SystemFormView
        edit={edit}
        existingSystems={existingSystems}
        nodeFormErrors={nodeFormErrors}
        setNodeFormErrors={setNodeFormErrors}
        addNodeForm={addNodeForm}
        updateNodeForm={updateNodeForm}
        connections={connections}
        addConnection={addConnection}
      />
    </Panel>
  )
}
