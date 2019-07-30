import React from 'react'
import styled from 'styled-components'
import { SystemsGraph, NodeDetail, AddNodeForm, CommandBar } from './components'

const Page = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #e8e3db;
`
function App () {
  return (
    <Page>
      <CommandBar />
      <AddNodeForm />
      <NodeDetail />
      <SystemsGraph />
    </Page>
  )
}

export default App
