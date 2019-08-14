import React from 'react'
import styled from 'styled-components'
import { DiagramForm, DiagramBrowser, DiagramTitle, SystemsGraph, NodeDetail, SystemForm, CommandBar, Layout } from './components'

const { Header, Content } = Layout

const Page = styled(Layout)`
  height: 100vh;
`

const GraphArea = styled(Content)`
  background-color: #e8e3db;
`

function App () {
  return (
    <Page
      sidebarSize={0}
    >
      <Header>
        <CommandBar />
      </Header>
      <DiagramTitle />
      <DiagramForm />
      <DiagramBrowser />
      <GraphArea>
        <SystemsGraph />
      </GraphArea>
      <SystemForm />
      <NodeDetail />
    </Page>
  )
}

export default App
