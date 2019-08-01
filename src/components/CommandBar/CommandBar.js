import React from 'react'
import { useEvent } from '../../hooks'
import { CommandBar as OfficeCommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { downloadFile, uploadFile } from '../../util/FileManager'
import { NodeManager } from '../../util/NodeManager'
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
    },
    {
      key: 'upload',
      name: 'Upload',
      iconProps: {
        iconName: 'Upload'
      },
      onClick: () => {
        uploadFile()
      }
    },
    {
      key: 'download',
      name: 'Download',
      iconProps: {
        iconName: 'Download'
      },
      onClick: () => {
        const edges = NodeManager.getEdges()
        const nodes = NodeManager.getNodesObject()

        const filename = 'TR_Systems'
        downloadFile(filename, JSON.stringify({ edges, nodes }, null, 2))
      }
    }
  ]

  return (
    <OfficeCommandBar
      items={items}
    />
  )
}
