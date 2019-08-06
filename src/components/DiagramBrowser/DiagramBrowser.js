import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { useEvent } from '../../hooks'
import { Graph } from '../../util'
import { DiagramBrowserView } from './DiagramBrowserView'

const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true
      }
    case 'success':
      return {
        ...state,
        diagrams: action.diagrams,
        loading: false
      }
    case 'failure':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default: return state
  }
}

const getDiagrams = async dispatch => {
  dispatch({ type: 'loading' })
  try {
    const diagramsObject = await Graph.getDiagrams()
    const diagrams = Object.values(diagramsObject)
    dispatch({ type: 'success', diagrams })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

export const DiagramBrowser = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [current, dispatch] = useReducer(diagramReducer, { diagrams: [], loading: true })

  const openDiagramBrowser = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const closeDiagramBrowser = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEvent('open-diagram-browser', openDiagramBrowser)

  useEffect(() => {
    if (isOpen) {
      getDiagrams(dispatch)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={closeDiagramBrowser}
    >
      <DiagramBrowserView
        diagrams={current.diagrams}
        loading={current.loading}
      />
    </Modal>
  )
}
