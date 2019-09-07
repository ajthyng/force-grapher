import dayjs from 'dayjs'
import get from 'lodash.get'
import uuid from 'uuid/v4'
import { Graph } from './Graph'
import { Subject } from './Subject'

export const downloadFile = async () => {
  const current = await Graph.getCurrentDiagram()
  const diagramName = get(current, '_name', 'Default Name')

  const edgeKeys = Object.keys(get(current, '_edges', {}))
  if (current['_edges']) {
    edgeKeys.forEach(key => {
      current['_edges'][key] = current['_edges'][key].filter(
        edge => edge !== null
      )
    })
  }

  const data = JSON.stringify({
    id: get(current, '_id'),
    name: get(
      current,
      '_name',
      'Generic and Unnamed Diagram With Exceptionally Long Title'
    ),
    nodes: get(current, '_nodes', {}),
    edges: get(current, '_edges', {})
  })
  const element = document.createElement('a')
  const blob = new Blob([data], { type: 'text/plain' })
  const filename = `${diagramName} - ${dayjs().format(
    'YYYY-MM-DD[T]HHmmss'
  )}.json`

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    element.setAttribute('href', `data:text/plain;charset=utf-8,${data}`)

    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
}

const handleFile = event => {
  const reader = new FileReader()
  reader.readAsBinaryString(event.target.files[0])

  reader.onloadend = async () => {
    const data = JSON.parse(reader.result)

    const edgeKeys = Object.keys(get(data, 'edges', {}))
    if (data['edges']) {
      edgeKeys.forEach(key => {
        data['edges'][key] = data['edges'][key].filter(edge => edge !== null)
      })
    }

    const edges = get(data, 'edges', {})
    const nodes = get(data, 'nodes', {})
    const id = get(data, 'id', uuid())
    const name = get(data, 'name', 'Unnamed System')

    const diagrams = await Graph.getDiagrams()

    if (diagrams[id]) {
      await Graph.restoreDiagram(diagrams[id]._id)
    }

    await Graph.saveUploadedData({ edges, nodes, name, id })
    Subject.next('graph-data-updated')
  }
}

export const uploadFile = () => {
  const element = document.createElement('input')
  element.setAttribute('type', 'file')
  element.setAttribute('accept', '.json')

  element.style.display = 'none'
  element.addEventListener('change', handleFile)
  element.click()
}
