/**
 * Select data record from table and return its attributes.
 * @param entity name of table, ex. 'users'
 * @param id     uuid of record, ex. '5bc15f55b0a0244f2e5a35f1'
 */
function getEntityAttributesById(entity, id) {
  return state =>
    state.getIn(['data', entity, id, 'data', 'attributes']).toJS()
}

export default getEntityAttributesById
