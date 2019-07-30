import React from 'react'
import { useEvent } from '../../hooks'
import { CommandBar as OfficeCommandBar } from 'office-ui-fabric-react/lib/CommandBar'

export const CommandBar = props => {
  const toggleLeftPanel = useEvent('toggle-left-panel')

  const items = [
    {
      key: 'addNode',
      name: 'Add System',
      iconProps: {
        iconName: 'Add'
      },
      onClick: toggleLeftPanel
    }
  ]

  return (
    <OfficeCommandBar
      items={items}
    />
  )
}
