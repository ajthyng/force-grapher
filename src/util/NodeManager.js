const _NodeManager = () => {
  const _get = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) || defaultValue
  const _set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  const addNode = node => {
    const nodes = _get('nodes', [])
    nodes.push(node)
    _set('nodes', nodes)
  }

  const getNodes = node => {
    const nodes = _get('nodes', [])
    return nodes
  }

  return {
    addNode,
    getNodes
  }
}

export const NodeManager = _NodeManager()
