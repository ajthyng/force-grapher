const _NodeManager = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getNodesObject = () => {
    return _get('_nodes', {})
  }

  const getNodes = () => {
    const nodes = _get('_nodes', {})
    const nodeKeys = Object.keys(nodes)

    return nodeKeys.reduce((acc, cur) => {
      acc.push(nodes[cur])
      return acc
    }, [])
  }

  const getEdges = () => {
    return _get('_edges', {})
  }

  const saveUploadedData = ({ edges, nodes }) => {
    _set('_edges', edges)
    _set('_nodes', nodes)
  }

  return {
    getEdges,
    getNodesObject,
    saveUploadedData,
    getNodes
  }
}

export const NodeManager = _NodeManager()
