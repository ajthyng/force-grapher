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

  let results = nodes && nodes.filter(node => {
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
  const toggleSystemForm = useEvent('toggle-system-form')
  const toggleDiagramForm = useEvent('toggle-diagram-form')
  const openDiagramBrowser = useEvent('open-diagram-browser')

  useEffect(() => {
    const focusSearch = () => {
      const searchBox = document.querySelector('#search-box-nodes')
      searchBox.focus()
    }

    Subject.subscribe('focus-search-bar', focusSearch)
  }, [])

  const farItems = [
    {
      key: 'open',
      name: 'Open Diagram',
      iconProps: {
        iconName: 'OpenFile'
      },
      onClick: openDiagramBrowser
    },
    {
      key: 'search',
      onRender: SearchNodes
    }
  ]

  const nearItems = [
    {
      key: 'add',
      name: 'Add',
      iconProps: {
        iconName: 'Add'
      },
      subMenuProps: {
        items: [
          {
            key: 'system',
            name: 'System',
            onClick: toggleSystemForm,
            iconProps: {
              iconName: 'GitGraph'
            }
          },
          {
            key: 'diagram',
            name: 'Diagram',
            onClick: toggleDiagramForm,
            iconProps: {
              iconName: 'VisioDiagram'
            }
          }
        ]
      }
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
        downloadFile()
      }
    }
  ]

  return (
    <div>
      <OfficeCommandBar
        styles={{
          root: {
            boxShadow: '0 2px 2px #30303030'
          }
        }}
        items={nearItems}
        farItems={farItems}
      />
    </div>
  )
}
