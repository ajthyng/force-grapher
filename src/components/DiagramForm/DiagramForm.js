import React, { useReducer, useCallback, useState } from 'react'
import { useEvent } from '../../hooks'
import { Graph } from '../../util'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { DialogFormView } from './DiagramFormView'
import set from 'lodash.set'
import unset from 'lodash.unset'

const formReducer = (state, action) => {
  if (action.path === '') return {}
  switch (action.type) {
    case 'remove':
      const removedState = { ...state }
      if (action.path) unset(removedState, action.path)
      return removedState
    case 'update':
      const updatedState = { ...state }
      return set(updatedState, action.path, action.value)
    default:
      return state
  }
}

const validate = form => {
  const errors = {}
  if (!form.name) errors.name = 'Diagrams must have a name, c\'mon it\'s one text field'
  return errors
}

export const DiagramForm = props => {
  const { initialForm } = props
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useReducer(formReducer, initialForm || {})
  const [errors, setErrors] = useReducer(formReducer, {})

  const openDiagramForm = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const closeDiagramForm = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEvent('toggle-diagram-form', openDiagramForm)
  const broadcastGraphDataUpdate = useEvent('graph-data-updated')

  const submit = useCallback(async () => {
    const errors = validate(form)
    if (errors.name) {
      setErrors({ type: 'update', path: 'name', value: errors.name })
    } else {
      const shouldCopy = form.copy
      const diagram = {
        name: form.name
      }
      if (shouldCopy) {
        diagram.nodes = await Graph.getNodes()
        diagram.edges = await Graph.getEdges()
      }

      const { _id } = await Graph.makeNewDiagram(diagram)
      closeDiagramForm()
      await Graph.setCurrentDiagram(_id)
      broadcastGraphDataUpdate()
    }
  }, [setErrors, form, closeDiagramForm, broadcastGraphDataUpdate])

  return (
    <Modal
      isBlocking={false}
      onDismiss={closeDiagramForm}
      isOpen={isOpen}
    >
      <DialogFormView
        form={form}
        setForm={setForm}
        setErrors={setErrors}
        errors={errors}
        submit={submit}
        dismiss={closeDiagramForm}
      />
    </Modal>
  )
}
