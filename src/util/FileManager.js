import dayjs from 'dayjs'
import get from 'lodash.get'
import { NodeManager } from './NodeManager'
import { Subject } from './Subject'

export const downloadFile = (filename, data) => {
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`)
  element.setAttribute('download', `${filename} - ${dayjs().format('YYYY-MM-DD/THHmmss')}.json`)

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const handleFile = (event) => {
  const reader = new FileReader()
  reader.readAsBinaryString(event.target.files[0])

  reader.onloadend = async () => {
    const data = JSON.parse(reader.result)
    const edges = get(data, 'edges', {})
    const nodes = get(data, 'nodes', {})

    NodeManager.saveUploadedData({ edges, nodes })
    Subject.next('save-node-entry')
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
