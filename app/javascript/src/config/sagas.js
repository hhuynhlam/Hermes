import { all } from 'redux-saga/effects'
import { sagas as profile } from '../profile'

export default function* Sagas() {
  yield all([
    profile(),
  ])
}
