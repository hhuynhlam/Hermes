import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

export const initialState = Map()
export default handleActions({}, initialState)
