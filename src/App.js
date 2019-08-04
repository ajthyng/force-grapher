import React from 'react'
import styled from 'styled-components'
import { SystemsGraph, NodeDetail, SystemForm, CommandBar } from './components'

const Page = styled.div`
  background-color: #e8e3db;
  flex: 1;
  flex-direction: column;
  display: flex;
`

function App () {
  return (
    <Page>
      <i class='hidden ion-md-heart' />
      <CommandBar />
      <SystemsGraph />
      <SystemForm />
      <NodeDetail />
    </Page>
  )
}

export default App
