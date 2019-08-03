import React from 'react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { Text } from 'office-ui-fabric-react/lib/Text'

const NodeDetailView = props => {
  const { description, department, url, connections } = props
  return (
    <Stack tokens={{ childrenGap: 8 }}>
      <Stack tokens={{ childrenGap: 4 }}>
        <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Description</Text>
        <Text>{description}</Text>
      </Stack>
      <Stack tokens={{ childrenGap: 4 }}>
        <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Department</Text>
        <Text>{department}</Text>
      </Stack>
      <Stack tokens={{ childrenGap: 4 }}>
        <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>URL</Text>
        <a href={url}>{url}</a>
      </Stack>
      <Stack>
        <Text style={{ textDecoration: 'underline' }} variant='mediumPlus'>Connections</Text>
        {connections}
      </Stack>
    </Stack>
  )
}

export default NodeDetailView
