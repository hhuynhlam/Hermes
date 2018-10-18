function getCurrentUser(state) {
  const path = 'profile.data'

  const pathToId = `${path}.id`.split('.')
  const pathToAttributes = `${path}.attributes`.split('.')

  const attributes = state.getIn(pathToAttributes).toJS()
  const id = state.getIn(pathToId)

  return {
    id,
    ...attributes,
  }
}

export default getCurrentUser
