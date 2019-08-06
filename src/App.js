import React from 'react'
import styled from 'styled-components'
import { DiagramForm, DiagramBrowser, SystemsGraph, NodeDetail, SystemForm, CommandBar } from './components'

const Page = styled.div`
  background-color: #e8e3db;
  flex: 1;
  flex-direction: column;
  display: flex;
`

function App () {
  return (
    <Page>
      <CommandBar />
      <DiagramForm />
      <DiagramBrowser />
      <SystemsGraph />
      <SystemForm />
      <NodeDetail />
    </Page>
  )
}

export default App
