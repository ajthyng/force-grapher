import omit from 'lodash.omit'

export const Graph = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const getEdges = async () => {
    return _get('_edges', {})
  }

  const getNodes = async () => {
    return _get('_nodes', [])
  }

  const setEdges = async (edges) => {
    return _set('_edges', edges)
  }

  const setNodes = async (nodes) => {
    return _set('nodes', nodes)
  }

  const addNode = async (node) => {
    if (!node.id) throw new Error('Nodes must have IDs to be added')
    const _nodes = await getNodes()
    const _edges = await getEdges()

    _nodes.push(node)
    _edges[node.id] = []

    await setEdges(_edges)
    await setNodes(_nodes)
  }

  const addEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add edges')

    const _edges = await getEdges()

    _edges[node1.id].push({ node: node2, data })
    _edges[node2.id].push({ node: node1, data })

    await setEdges(_edges)
  }

  const addDirectedEdge = async (node1, node2, data) => {
    if (!node1.id || !node2.id) throw new Error('Nodes must have IDs to add directed edges')

    const _edges = await getEdges()

    _edges[node1.id].push({ node: node2, data })

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

  return {
    addNode,
    addEdge,
    addDirectedEdge,
    removeEdge,
    removeDirectedEdge
  }
}
