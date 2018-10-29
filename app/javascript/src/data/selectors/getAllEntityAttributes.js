import { get, flow, mapValues } from 'lodash/fp'

/**
 * Select all data records from table and return its attributes.
 * @param entity name of table, ex. 'users'
 */
function getAllEntityAttributes(entity) {
  return state => flow([
    s => s.getIn(['data', entity]).toJS(),
    mapValues(value => ({
      id: get('id')(value),
      ...get('attributes')(value),
    })),
  ])(state)
}

export default getAllEntityAttributes
