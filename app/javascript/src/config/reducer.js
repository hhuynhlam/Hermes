import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import { reducer as data } from '../data'
import { reducer as profile } from '../profile'
import { reducer as snackbar } from '../snackbar'

export default combineReducers({
  data,
  form,
  profile,
  snackbar,
})
