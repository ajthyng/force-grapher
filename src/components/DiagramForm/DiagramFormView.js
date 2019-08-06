import React from 'react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'
import { IconButton, DefaultButton, PrimaryButton, Toggle } from 'office-ui-fabric-react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import styled from 'styled-components'

const Form = styled(Stack)`
  padding: 12px;
`

const ButtonGroup = styled(Stack)`
  padding-top: 24px;
`

const Title = styled(Text)`
  padding: 12px;
  margin-right: 40px;
`

const Close = styled(IconButton).attrs(() => ({ iconProps: { iconName: 'ChromeClose' } }))``

export const DialogFormView = props => {
  const { dismiss, form, setForm, setErrors, submit, errors } = props

  return (
    <Form tokens={{ childrenGap: 12 }}>
      <Stack horizontal>
        <Title variant='xxLarge'>Add New Diagram</Title>
        <Close onClick={dismiss} />
      </Stack>
      <TextField
        label='Name'
        placeholder={`Enter a name for your diagram`}
        errorMessage={errors.name || ''}
        value={form.name || ''}
        onChange={(event, value) => {
          if (value) setErrors({ type: 'remove', path: 'name' })
          setForm({ type: 'update', path: 'name', value })
        }}
      />
      <Toggle
        inlineLabel
        onText='On'
        offText='Off'
        label='Copy Current Diagram'
        checked={form.copy || false}
        onChange={(event, value) => {
          setForm({ type: 'update', path: 'copy', value })
        }}
      />
      <ButtonGroup horizontal horizontalAlign='space-between'>
        <DefaultButton text='Cancel' onClick={dismiss} />
        <PrimaryButton text='Submit' onClick={submit} />
      </ButtonGroup>
    </Form>
  )
}
