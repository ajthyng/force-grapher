const _NodeManager = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue

  const getNodes = () => {
    const nodes = _get('_nodes', {})
    const nodeKeys = Object.keys(nodes)

    return nodeKeys.reduce((acc, cur) => {
      acc.push(nodes[cur])
      return acc
    }, [])
  }

  const getEdges = () => {
    const edges = _get('_edges', {})
    return edges
  }

  return {
    getEdges,
    getNodes
  }
}

export const NodeManager = _NodeManager()
