import { getEntityAttributesById } from '../../data'

function getCurrentUser(state) {
  const id = state.getIn(['profile', 'currentUser'])

  const attributes = getEntityAttributesById('users', id)(state)

  return {
    id,
    ...attributes,
  }
}

export default getCurrentUser
