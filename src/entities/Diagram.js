import uuid from 'uuid/v4'

export const Diagram = ({ name, edges, nodes, id }) => {
  const _name = name
  const _edges = edges
  const _nodes = nodes
  const _id = id || uuid()

  const _getDiagrams = async () => {
    return JSON.parse(localStorage.getItem('_diagrams')) || {}
  }

  const _setDiagrams = async (diagrams = {}) => {
    localStorage.setItem('_diagrams', JSON.stringify(diagrams))
  }

  const save = async () => {
    const diagrams = await _getDiagrams()
    diagrams[_id] = {
      _name,
      _edges,
      _nodes,
      _id
    }
    await _setDiagrams(diagrams)
  }

  const load = async (id) => {
    if (!id) throw new Error('You must have an ID to get a diagram')
    const diagrams = await _getDiagrams()
    return diagrams[id]
  }

  return {
    save,
    load
  }
}
