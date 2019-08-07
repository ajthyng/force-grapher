import React, { useReducer, useEffect, useCallback } from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text'
import styled from 'styled-components'
import { useEvent } from '../../hooks'
import { Graph } from '../../util'

const Container = styled.div.attrs(props => ({
  display: props.title ? 'flex' : 'none'
}))`
  position: absolute;
  top: 60px;
  right: 16px;
  display: ${({ display }) => display};
  align-items: flex-start;
  justify-content: center;
  padding: 8px 12px 8px 8px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 3px 5px #30303030;

  @media only screen and (max-width: 767px) {
    display: none;
  }
`

const titleReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true
      }
    case 'success':
      return {
        ...state,
        title: action.title,
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

const getTitle = async (dispatch) => {
  dispatch({ type: 'loading' })
  try {
    const title = await Graph.getTitle()
    dispatch({ type: 'success', title })
  } catch (error) {
    dispatch({ type: 'failure', error })
  }
}

export const DiagramTitle = props => {
  const [current, dispatch] = useReducer(titleReducer, {})

  const updateTitle = useCallback(() => {
    getTitle(dispatch)
  }, [dispatch])

  useEffect(() => {
    updateTitle()
  }, [updateTitle])

  useEvent('graph-data-updated', updateTitle)

  return current.loading ? null : (
    <Container title={current.title} >
      <Text variant='xLarge'>{current.title}</Text>
    </Container>
  )
}
