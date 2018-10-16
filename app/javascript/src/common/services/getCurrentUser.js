import { flow, getOr } from 'lodash/fp'

export default () => flow([
  getOr({}, '__STORE__.user.data'),
  data => ({ id: data.id, ...data.attributes }),
])(window)
