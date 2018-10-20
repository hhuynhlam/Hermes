import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = fromJS({
  open: false,
})

function closeSnackbarReducer() {
  return fromJS({
    open: false,
  })
}

function openSnackbarReducer(state, { payload }) {
  return fromJS({
    ...payload,
    open: true,
  })
}

export default handleActions({
  [actions.CLOSE_SNACKBAR]: closeSnackbarReducer,
  [actions.OPEN_SNACKBAR]: openSnackbarReducer,
}, initialState)
