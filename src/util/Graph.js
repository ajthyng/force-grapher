import get from 'lodash.get'
import differenceby from 'lodash.differenceby'
import uuid from 'uuid/v4'

const shouldFixEdges = true

const _Graph = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const fixEdges = oldEdges => {
    const edges = { ...oldEdges }
    const edgeKeys = Object.keys(edges)
    let didFix = false

    edgeKeys.forEach(key => {
      const nodeEdges = edges[key]
      const currentEdgeID = key
      nodeEdges.forEach(edge => {
        if (edge.node === key) return
        const otherEdges = edges[edge.node]
        const otherEdgeIndex = otherEdges && otherEdges.findIndex(edge => edge.node === currentEdgeID)
        if (otherEdgeIndex >= 0) {
          otherEdges.splice(otherEdgeIndex, 1)
          if (!didFix) didFix = true
        }
      })

      if (edges.length <= 0) delete nodeEdges[key]
    })

    return { edges, didFix }
  }

  const updateNodePosition = async ({ node, x, y }) => {
    const nodes = await _get('_nodes', {})
    if (nodes[node]) {
      nodes[node].position = {
        x,
        y
      }
    }
    return _set('_nodes', nodes)
  }

  const getEdges = async () => {
    if (shouldFixEdges) {
      const _edges = await _get('_edges', {})
      const { didFix, edges } = fixEdges(_edges)
      if (didFix) {
        await _set('_edges', edges)
      }
    }
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

    _nodes[node.id] = node

    await makeEdges(node)
    await setNodes(_nodes)
  }

  const addEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add edges')

    const _edges = await getEdges()

    if (!Array.isArray(_edges[node1.id])) _edges[node1.id] = []

    await addDirectedEdge(node1, node2, data)
  }

  const addDirectedEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add directed edges')

    const _edges = await getEdges()

    if (!Array.isArray(_edges[node1.id])) _edges[node1.id] = []

    const node2TargetID = _edges[node1.id].findIndex(({ node }) => node === node2.id)

    if (node2TargetID >= 0) {
      // Replace edge because it exists already
      _edges[node1.id][node2TargetID] = { node: node2.id, data }
    } else {
      // Add edge, it does not exist
      _edges[node1.id].push({ node: node2.id, data })
    }

    await setEdges({ ..._edges })
  }

  const removeDirectedEdge = async (node1, node2) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to remove directed eges')

    const _edges = await getEdges()

    _edges[node1.id] = _edges[node1.id] && _edges[node1.id].filter(({ node }) => node !== node2.id)

    await setEdges(_edges)
  }

  const removeEdge = async (node1, node2) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to remove edges')

    const _edges = await getEdges()

    _edges[node1.id] = _edges[node1.id] && _edges[node1.id].filter(({ node }) => node !== node2.id)

    await setEdges(_edges)
  }

  const makeNode = async ({ id, data, connections }) => {
    let node = null
    if (id) {
      const nodes = await getNodes()
      node = {
        id,
        edges: [],
        previousEdges: nodes[id].edges.map(item => ({ ...item })),
        data: {
          ...nodes[id].data,
          ...data
        }
      }
    } else {
      node = {
        id: uuid(),
        edges: [],
        data: {
          ...(data || {})
        }
      }
    }

    const connectionKeys = Object.keys(connections || {})
    const previousEdges = get(node, 'previousEdges', [])

    if (connectionKeys.length <= 0 && previousEdges.length > 0) {
      const edges = await getEdges()
      delete edges[node.id]
      const removeEdges = []
      Object.keys(edges).forEach(key => {
        edges[key].forEach((edge, index) => {
          if (edge.node === node.id) {
            removeEdges.push({ key, index })
          }
        })
      })
      removeEdges.forEach(remove => {
        edges[remove.key].splice(remove.index, 1)
      })
      await setEdges({ ...edges })
      return node
    }

    connectionKeys.forEach(key => {
      const info = get(connections, `${[key]}.connectedTo`, null)
      if (!info) throw new Error('You cannot make a connection without a target')
      const type = get(connections, `${[key]}.connectionType`, null)
      if (!type) throw new Error('You cannot make a connection without a type')

      const read = get(connections, `${[key]}.read`, null)
      const write = get(connections, `${[key]}.write`, null)

      if (!read && !write) throw new Error('You must specify a read or a write option')

      const data = get(connections, `[${key}].data`, {})

      const existingEdgeIndex = node.edges.findIndex(edge => edge.id === key)

      if (existingEdgeIndex >= 0) {
        node.edges[existingEdgeIndex] = {
          id: info.key,
          data: {
            ...data,
            read,
            write,
            type: {
              id: type.key,
              label: type.text
            }
          }
        }
      } else {
        node.edges.push({
          id: info.key,
          data: {
            ...data,
            read,
            write,
            type: {
              id: type.key,
              label: type.text
            }
          }
        })
      }
    })
    return node
  }

  const makeEdges = async (node) => {
    const edges = get(node, 'edges', [])
    const previousEdges = get(node, 'previousEdges', [])

    if (edges.length <= 0) return

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]

      const read = get(edge, 'data.read')
      const write = get(edge, 'data.write')

      const node1 = {
        id: get(node, 'id')
      }
      const node2 = {
        id: get(edge, 'id')
      }

      const prevEdge = previousEdges.find(({ id }) => id === edge.id)

      const prev = {
        read: get(prevEdge, `data.read`, read),
        write: get(prevEdge, `data.write`, write)
      }

      if (prev.read && !read) {
        await removeDirectedEdge(node2, node1)
      }

      if (prev.write && !write) {
        await removeDirectedEdge(node1, node2)
      }

      if (read && write) {
        await addEdge(node1, node2, get(edge, 'data'))
      } else if (read) {
        await addDirectedEdge(node2, node1, get(edge, 'data'))
      } else if (write) {
        await addDirectedEdge(node1, node2, get(edge, 'data'))
      }
    }

    const cleanup = differenceby(previousEdges, node.edges, 'id')

    if (cleanup.length >= 0) {
      for (let i = 0; i < cleanup.length; i++) {
        const edge = cleanup[i]

        const read = get(edge, 'data.read')
        const write = get(edge, 'data.write')

        const node1 = {
          id: get(node, 'id')
        }
        const node2 = {
          id: get(edge, 'id')
        }

        if (read && write) {
          await removeEdge(node1, node2)
        } else if (read) {
          await removeDirectedEdge(node2, node1)
        } else if (write) {
          await removeDirectedEdge(node1, node2)
        }
      }
    }
  }

  return {
    getNodes,
    getEdges,
    addNode,
    removeEdge,
    removeDirectedEdge,
    updateNodePosition,
    makeNode
  }
}

export const Graph = _Graph()
