import React from 'react'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'

export const SystemType = props => {
  const { selectedKey, onChange, required, errorMessage } = props
  return (
    <Dropdown
      required={required}
      label='System Type'
      options={[
        { key: 'oncampus', text: 'On Campus' },
        { key: 'cloud', text: 'Cloud' },
        { key: 'external', text: 'External' }
      ]}
      errorMessage={errorMessage}
      placeholder='Where does this system live?'
      selectedKey={selectedKey}
      onChange={onChange}
    />
  )
}
