import { Network as VisNetwork, DataSet } from 'vis-network'

const _Network = () => {
  let _nodes = []
  let _edges = []
  let _options = {}
  let _container = null
  let _network = null

  const inContainer = element => {
    _container = element
    return builder
  }

  const withNodes = nodes => {
    _nodes = nodes
    return builder
  }

  const withEdges = edges => {
    _edges = edges
    return builder
  }

  const withOptions = options => {
    _options = options
    return builder
  }

  const makeData = () => {
    return {
      nodes: new DataSet(_nodes),
      edges: new DataSet(_edges)
    }
  }

  const build = () => {
    if (!_network) {
      _network = new VisNetwork(_container, makeData(), _options)
    }
    return {
      network: _network,
      setData: ({ nodes, edges }) => {
        _nodes = nodes
        _edges = edges
        _network.setData(makeData())
      },
      getNodes: () => _nodes,
      getEdges: () => _edges
    }
  }

  const builder = {
    withEdges,
    withNodes,
    withOptions,
    inContainer,
    build
  }

  return builder
}

export const Network = _Network()
