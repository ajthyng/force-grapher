import React from 'react'
import { Loading } from '../'
import styled from 'styled-components'
import { DiagramList } from './DiagramList'

const ListContainer = styled.div`
  width: 600px;
  padding: 12px;

  @media only screen and (max-width: 767px) {
    width: 100vw;
    padding: 12px 0;
  }
`

export const DiagramBrowserView = props => {
  const { diagrams, loading } = props

  return (
    <ListContainer>
      {loading ? <Loading /> : <DiagramList diagrams={diagrams} />}
    </ListContainer>
  )
}
