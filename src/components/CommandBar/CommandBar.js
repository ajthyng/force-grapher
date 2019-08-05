import React, { useEffect } from 'react'
import { useEvent } from '../../hooks'
import { CommandBar as OfficeCommandBar } from 'office-ui-fabric-react/lib/CommandBar'
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import { downloadFile, uploadFile } from '../../util/FileManager'
import { Graph, Subject } from '../../util'
import debounce from 'lodash.debounce'
import get from 'lodash.get'

const handleSearch = async (event, value) => {
  const nodes = await Graph.getNodesArray()

  let results = nodes.filter(node => {
    const name = get(node, 'data.name', '').toLowerCase()
    return name.includes(value.toLowerCase())
  }).map(({ id }) => id)

  if (!value) {
    results = []
  }

  Subject.next('node-search-result', results)
}

const SearchNodes = () => {
  return (
    <SearchBox
      id='search-box-nodes'
      placeholder='Search'
      className='searchBox'
      styles={{
        root: {
          width: '250px',
          alignSelf: 'center'
        }
      }}
      onChange={debounce(handleSearch, 500)}
    />
  )
}

export const CommandBar = props => {
  const toggleLeftPanel = useEvent('toggle-left-panel')
  useEffect(() => {
    const focusSearch = () => {
      const searchBox = document.querySelector('#search-box-nodes')
      searchBox.focus()
    }

    Subject.subscribe('focus-search-bar', focusSearch)
  }, [])

  const farItems = [
    {
      key: 'search',
      onRender: SearchNodes
    }
  ]

  const nearItems = [
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
      onClick: async () => {
        const edges = await Graph.getEdges()
        const nodes = await Graph.getNodesObject()

        const filename = 'TR_Systems'
        downloadFile(filename, JSON.stringify({ edges, nodes }, null, 2))
      }
    }
  ]

  return (
    <div>
      <OfficeCommandBar
        items={nearItems}
        farItems={farItems}
      />
    </div>
  )
}
