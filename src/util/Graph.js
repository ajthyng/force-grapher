import get from 'lodash.get'
import differenceby from 'lodash.differenceby'
import uuid from 'uuid/v4'
import unset from 'lodash.unset'

const shouldFixEdges = true

const _Graph = () => {
  const _get = (key, defaultValue) => {
    const value = localStorage.getItem(key) || defaultValue
    try {
      const parsed = JSON.parse(value)
      return parsed
    } catch (err) {
      return value
    }
  }
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const fixEdges = oldEdges => {
    const edges = { ...oldEdges }
    const edgeKeys = Object.keys(edges)
    let didFix = false

    edgeKeys.forEach(key => {
      const nodeEdges = edges[key]
      const currentEdgeID = key
      nodeEdges.forEach(edge => {
        if (!edge) return
        if (edge.node === key) return
        const otherEdges = edges[edge.node]
        const otherEdgeIndex = otherEdges && otherEdges.findIndex(edge => (edge && edge.node === currentEdgeID))
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
    const nodes = await getNodes()
    if (nodes[node]) {
      nodes[node].position = {
        x,
        y
      }
    }
    return setNodes(nodes)
  }

  const updateBatchNodePositions = async (nodes) => {
    const existingNodes = await getNodes()
    Object.entries(nodes).forEach(([node, { x, y }]) => {
      if (existingNodes[node]) {
        existingNodes[node].position = { x, y }
      }
    })
    return setNodes(existingNodes)
  }

  const getEdges = async () => {
    const current = await getCurrentDiagram()
    if (!current._edges) {
      const edges = await _get('_edges', {})
      if (edges) {
        current._edges = edges
        await updateDiagrams(current)
        await localStorage.removeItem('_edges')
      }
    }

    const _edges = get(current, `_edges`, {})
    if (shouldFixEdges) {
      const { didFix, edges } = fixEdges(_edges)
      if (didFix) {
        await setEdges(edges)
      }
    }
    return _edges
  }

  const getNodesArray = async () => {
    const nodes = await getNodes()
    return Object.values(nodes)
  }

  const getNodes = async () => {
    const current = await getCurrentDiagram()
    if (!current._nodes) {
      const nodes = await _get('_nodes', {})
      if (nodes) {
        current._nodes = nodes
        await updateDiagrams(current)
        await localStorage.removeItem('_nodes')
      }
    }

    return get(current, `_nodes`, {})
  }

  const getDiagrams = async () => {
    return _get('_diagrams', {})
  }

  const updateDiagrams = async (diagram) => {
    if (!diagram._id) return
    const diagrams = await getDiagrams()
    diagrams[diagram._id] = diagram
    return _set('_diagrams', diagrams)
  }

  const setEdges = async (edges) => {
    const current = await getCurrentDiagram()
    current._edges = edges
    return updateDiagrams(current)
  }

  const setNodes = async (nodes) => {
    const current = await getCurrentDiagram()
    current._nodes = nodes
    return updateDiagrams(current)
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

    const node2TargetID = _edges[node1.id].findIndex(edge => (edge && edge.node === node2.id))

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

    _edges[node1.id] = _edges[node1.id] && _edges[node1.id].filter(edge => (edge && edge.node !== node2.id))

    await setEdges(_edges)
  }

  const removeEdge = async (node1, node2) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to remove edges')

    const _edges = await getEdges()

    _edges[node1.id] = _edges[node1.id] && _edges[node1.id].filter(edge => (edge && edge.node !== node2.id))

    await setEdges(_edges)
  }

  const makeNode = async ({ id, data, connections }) => {
    let node = null
    if (id) {
      const nodes = await getNodes()
      const position = get(nodes, `[${id}].position`, { x: undefined, y: undefined })
      node = {
        id,
        edges: [],
        previousEdges: nodes[id].edges.map(item => ({ ...item })),
        position,
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
          if (edge && edge.node === node.id) {
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

      const prevEdge = previousEdges.find(prev => (prev && prev.id === edge.id))

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

  const setCurrentDiagram = async (id) => {
    return _set('_currentDiagram', id)
  }

  const setName = async (name) => {
    const current = await getCurrentDiagram()
    current._name = name
    return updateDiagrams(current)
  }

  const saveUploadedData = async ({ edges, nodes, id, name }) => {
    if (id) {
      await setCurrentDiagram(id)
    }

    if (name) {
      await setName(name)
    }
    await setNodes(nodes)
    await setEdges(edges)
  }

  const getCurrentDiagram = async () => {
    const diagrams = await getDiagrams()
    let current = _get('_currentDiagram', null)
    const diagramKeys = Object.keys(diagrams)
    if (!current) {
      if (diagramKeys.length > 0) {
        current = diagramKeys[0]
      } else {
        current = uuid()
      }
      _set('_currentDiagram', current)
    }
    const diagram = diagrams[current]

    return diagram || { _id: current }
  }

  const makeNewDiagram = async ({ name, edges, nodes }) => {
    const _id = uuid()
    const diagram = {
      _id,
      _name: name,
      _edges: edges,
      _nodes: nodes
    }

    await updateDiagrams(diagram)
    return diagram
  }

  const setDiagramName = async ({ id, name }) => {
    if (!id) throw new Error(`Cannot find diagram to update.`)

    const diagrams = await getDiagrams()
    const diagram = diagrams[id]

    diagram._name = name

    await updateDiagrams(diagram)
  }

  const deleteNodes = async (nodes) => {
    if (!Array.isArray(nodes)) return
    const _edges = await getEdges()
    const _nodes = await getNodes()

    const updatedNodes = { ..._nodes }
    const updatedEdges = { ..._edges }

    for (let i = 0; i < nodes.length; i++) {
      unset(updatedNodes, `[${nodes[i]}]`)
    }

    const edgeKeys = Object.keys(updatedEdges)

    nodes.forEach(node => {
      const edgesToRemove = []
      edgeKeys.forEach(key => {
        const edges = updatedEdges[key] || []
        edges.forEach((edge, index) => {
          if (edge && edge.node === node) {
            edgesToRemove.push({ index, key })
          }
        })
      })
      unset(updatedEdges, `[${node}]`)
      edgesToRemove.forEach(edge => {
        unset(updatedEdges, `[${edge.key}][${edge.index}]`)
      })
    })

    await setEdges(updatedEdges)
    await setNodes(updatedNodes)
  }

  const getTitle = async () => {
    const diagram = await getCurrentDiagram()
    return diagram._name || ''
  }

  return {
    getNodes,
    getEdges,
    addNode,
    removeEdge,
    removeDirectedEdge,
    getDiagrams,
    updateNodePosition,
    updateBatchNodePositions,
    saveUploadedData,
    getCurrentDiagram,
    deleteNodes,
    makeNewDiagram,
    getNodesArray,
    setCurrentDiagram,
    getTitle,
    setDiagramName,
    makeNode
  }
}

export const Graph = _Graph()
