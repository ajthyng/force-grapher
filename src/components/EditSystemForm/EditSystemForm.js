import React, { useEffect, useState } from 'react'
import { Network } from '../../util'
import get from 'lodash.get'
import { Loading } from '../Loading'
import { SystemForm } from '../SystemForm'

const makeConnections = (system, nodes) => {
  const connections = {}
  system.edges.forEach(edge => {
    connections[edge.id] = {
      read: edge.data.read,
      write: edge.data.write,
      connectionType: {
        key: edge.data.type.id,
        text: edge.data.type.label
      },
      connectedTo: {
        key: edge.id,
        text: get(nodes.filter(node => node.id === edge.id), '[0].data.name', '')
      }
    }
  })
  return connections
}

export const EditSystemForm = props => {
  const { system } = props
  const [formState, setFormState] = useState({
    name: '',
    id: '',
    type: '',
    department: '',
    url: '',
    description: '',
    connections: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { network, getNodes } = Network.build()
    const nodes = network.getConnectedNodes(system.id)

    const connectedNodes = getNodes().filter(({ id }) => nodes.includes(id))

    const formState = {
      name: get(system, 'data.name'),
      id: get(system, 'id'),
      type: get(system, 'data.type'),
      department: get(system, 'data.department'),
      url: get(system, 'data.url'),
      description: get(system, 'data.description'),
      connections: makeConnections(system, connectedNodes)
    }
    setFormState(formState)
    setLoading(false)
  }, [system, formState])

  return loading ? <Loading /> : <SystemForm />
}
