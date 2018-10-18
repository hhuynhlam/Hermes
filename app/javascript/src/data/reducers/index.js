import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export const initialState = fromJS({
  currentUser: null,
})

export default handleActions({}, initialState)
