import { Map } from 'immutable'
import normalize from 'json-api-normalizer'
import { combineActions, handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = Map()

function resourceSuccessReducer(state, { payload }) {
  return state.mergeDeep(normalize(payload))
}

export default handleActions({
  [combineActions(
    actions.INDEX_RESOURCE_SUCCESS,
    actions.CREATE_RESOURCE_SUCCESS,
    actions.UPDATE_RESOURCE_SUCCESS,
  )]: resourceSuccessReducer,
}, initialState)
