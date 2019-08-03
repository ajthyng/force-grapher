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
      <SystemsGraph />
      <CommandBar />
      <SystemForm />
      <NodeDetail />
    </Page>
  )
}

export default App