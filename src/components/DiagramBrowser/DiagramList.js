import React, { useEffect, useState, useCallback } from 'react'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { ActionButton } from 'office-ui-fabric-react'
import { useEvent } from '../../hooks'
import { Graph } from '../../util'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const DiagramContainer = styled.div.attrs(props => ({
  backgroundColor: props.edit ? 'transparent' : 'rgb(237, 235, 233)'
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: default;

  &:hover {
    background-color: ${({ backgroundColor }) => backgroundColor}
  }

  transition: background-color 200ms ease-in-out;
`

const DiagramName = ({ edit, name, onChange, toggleEdit }) => {
  const checkForEnter = useCallback((event) => {
    if (event.which === 13) { // Enter key pressed
      toggleEdit()
    }
  }, [toggleEdit])

  if (!edit) return <Text styles={{ root: { userSelect: 'none' } }} variant='large'>{name || 'No Name Set'}</Text>
  return (
    <TextField
      onKeyDown={checkForEnter}
      styles={{ root: { flex: 1 } }}
      placeholder='Enter a name for this system'
      value={name}
      onChange={onChange}
    />
  )
}

const Diagram = ({ name, id, handleSelect }) => {
  const [edit, setEdit] = useState(false)
  const [diagramName, setDiagramName] = useState(name)
  const graphDataUpdated = useEvent('graph-data-updated')

  const updateGraphDataName = useCallback(async () => {
    await Graph.setDiagramName({ id, name: diagramName })
    graphDataUpdated()
  }, [graphDataUpdated, diagramName, id])

  useEffect(() => {
    updateGraphDataName()
  }, [updateGraphDataName])

  const toggleEdit = useCallback(() => {
    setEdit(edit => !edit)
  }, [setEdit])

  const selectDiagram = useCallback(async (event) => {
    await Graph.setCurrentDiagram(id)
    graphDataUpdated()
  }, [id, graphDataUpdated])

  const handleNameChange = useCallback((event, value) => {
    setDiagramName(value)
  }, [setDiagramName])

  return (
    <DiagramContainer onClick={!edit ? selectDiagram : () => null} edit={edit}>
      <DiagramName toggleEdit={toggleEdit} edit={edit} name={diagramName} onChange={handleNameChange} />
      <ActionButton styles={{ root: { justifySelf: 'flex-end' } }} text='Edit' iconProps={{ iconName: 'Edit' }} onClick={toggleEdit} />
    </DiagramContainer>
  )
}

export const DiagramList = props => {
  const { diagrams } = props
  if (diagrams.length <= 0) {
    return (
      <Container>
        <Text styles={{ root: { flex: 1, paddingLeft: 8, paddingRight: 8, textAlign: 'center' } }} variant='xxLargePlus'>No Diagrams Are Saved</Text>
      </Container>
    )
  }
  return (
    <Container>
      {diagrams.map(diagram => <Diagram key={diagram._id} name={diagram._name} id={diagram._id} />)}
    </Container>
  )
}

DiagramList.defaultProps = {
  diagrams: []
}
