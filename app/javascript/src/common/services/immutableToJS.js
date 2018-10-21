import { invoke } from 'lodash/fp'

function immutableToJS(value) {
  return invoke('toJS')(value) || value
}

export default immutableToJS
