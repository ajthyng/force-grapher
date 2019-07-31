import omit from 'lodash.omit'
import get from 'lodash.get'
import uuid from 'uuid/v4'

const _Graph = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const getEdges = async () => {
    return _get('_edges', {})
  }

  const getNodes = async () => {
    return _get('_nodes', {})
  }

  const setEdges = async (edges) => {
    return _set('_edges', edges)
  }

  const setNodes = async (nodes) => {
    return _set('_nodes', nodes)
  }

  const addNode = async (node) => {
    if (!node.id) throw new Error('Nodes must have IDs to be added')
    const _nodes = await getNodes()
    const _edges = await getEdges()

    _nodes[node.id] = node
    _edges[node.id] = []

    await setEdges(_edges)
    await setNodes(_nodes)
  }

  const addEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add edges')

    const _edges = await getEdges()

    _edges[node1.id].push({ node: node2.id, data })
    _edges[node2.id].push({ node: node1.id, data })

    await setEdges(_edges)
  }

  const addDirectedEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add directed edges')

    const _edges = await getEdges()

    _edges[node1.id].push({ node: node2.id, data })

    await setEdges(_edges)
  }

  const removeDirectedEdge = async (node1) => {
    if (!node1.id) throw new Error('Nodes must have IDs to remove directed eges')

    const _edges = await getEdges()

    const _updatedEdges = omit(_edges, node1.id)

    await setEdges(_updatedEdges)
  }

  const removeEdge = async (node1, node2) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to remove edges')

    const _edges = await getEdges()

    const _updatedEdges = omit(_edges, [node1.id, node2.id])

    await setEdges(_updatedEdges)
  }

  const makeNode = ({ data, connections }) => {
    const node = {
      id: uuid(),
      edges: [],
      data: {
        ...(data || {})
      }
    }

    const connectionKeys = Object.keys(connections || {})

    if (connectionKeys.length <= 0) return node

    connectionKeys.forEach(key => {
      const info = get(connections, `${[key]}.connectedTo`, null)
      if (!info) throw new Error('You cannot make a connection without a target')
      const type = get(connections, `${[key]}.connectionType`, null)
      if (!type) throw new Error('You cannot make a connection without a type')

      const data = get(connections, `[${key}].data`, {})

      node.edges.push({
        id: info.key,
        data: {
          ...data,
          type: {
            id: type.key,
            label: type.text
          }
        }
      })
    })

    return node
  }

  return {
    addNode,
    addEdge,
    addDirectedEdge,
    removeEdge,
    removeDirectedEdge,
    makeNode
  }
}

export const Graph = _Graph()
