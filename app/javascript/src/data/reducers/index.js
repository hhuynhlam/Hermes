import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = Map()

function updateResourceSuccessReducer(state, { payload }) {
  const { data } = payload

  return state.setIn([data.type, data.id], fromJS(payload))
}

export default handleActions({
  [actions.UPDATE_RESOURCE_SUCCESS]: updateResourceSuccessReducer,
}, initialState)
