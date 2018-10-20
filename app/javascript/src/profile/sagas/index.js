import { all, call, put, takeEvery } from 'redux-saga/effects'
import { invoke } from 'lodash/fp'
import axios from 'axios'
import immutableToJS from '../../common/services/immutableToJS'
import * as actions from '../actions'

function* updateProfileSaga({ payload }) {
  yield put({ type: actions.UPDATE_PROFILE_REQUEST })

  try {
    const { id, ...attributes } = immutableToJS(payload)

    const body = {
      data: {
        attributes,
      },
    }

    const { data } = yield call(axios.put, `/api/v1/users/${id}`, body)

    yield put({
      type: actions.UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: actions.UPDATE_PROFILE_FAILED,
      payload: invoke('toString')(error) || error,
    })
  }
}

function* watchUpdateProfileSaga() {
  yield takeEvery(actions.UPDATE_PROFILE, updateProfileSaga)
}

export default function* sagas() {
  yield all([
    watchUpdateProfileSaga(),
  ])
}
