import React from 'react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'

const canChange = (nextPath, nextValue) => (currentRead, currentWrite) => {
  if (nextPath === 'read') {
    return nextValue || currentWrite || false
  }

  if (nextPath === 'write') {
    return nextValue || currentRead || false
  }
  return false
}

export const ConnectionReadWrite = props => {
  const { read, write, onChange } = props

  return (
    <Stack style={{ marginRight: 8, marginTop: 8 }} verticalAlign='space-between' tokens={{ childrenGap: 4 }}>
      <Checkbox checked={!!read} onChange={(event, value) => {
        if (canChange('read', value)(read, write)) {
          onChange('read', value)
        }
      }} label='Receives Data' />
      <Checkbox checked={!!write} onChange={(event, value) => {
        if (canChange('write', value)(read, write)) {
          onChange('write', value)
        }
      }} label='Sends Data' />
    </Stack>
  )
}
