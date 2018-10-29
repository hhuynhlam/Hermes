import getEntityAttributesById from './getEntityAttributesById'

/**
 * Select data record from table based on relationship and return its attributes.
 * @param entity       name of table, ex. 'photos'
 * @param record       uuid of record, ex. '5bc15f55b0a0244f2e5a35f1'
 * @param relationship name of relationship, ex. 'owner'
 */
function getRelatedEntityAttributes(entity, record, relationship) {
  return (state) => {
    const { id, type } = state.getIn([
      'data', entity, record,
      'relationships', relationship, 'data',
    ]).toJS()

    return getEntityAttributesById(type, id)(state)
  }
}

export default getRelatedEntityAttributes
