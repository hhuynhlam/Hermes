import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = Map()

function updateProfileSuccessReducer(state, { payload }) {
  return fromJS(payload)
}

export default handleActions({
  [actions.UPDATE_PROFILE_SUCCESS]: updateProfileSuccessReducer,
}, initialState)
