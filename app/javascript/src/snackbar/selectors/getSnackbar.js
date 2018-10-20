function getSnackbar(state) {
  return state.getIn(['snackbar']).toJS()
}

export default getSnackbar
