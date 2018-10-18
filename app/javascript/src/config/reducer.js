import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import { reducer as profile } from '../profile'

export default combineReducers({
  form,
  profile,
})
