import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import { reducer as data } from '../data'

export default combineReducers({
  data,
  form,
})
