import { all, call, put, takeEvery } from 'redux-saga/effects'
import { invoke } from 'lodash/fp'
import axios from 'axios'
import immutableToJS from '../../common/services/immutableToJS'
import { openSnackbar } from '../../snackbar'
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
    yield put(openSnackbar({
      message: 'Profile Updated!',
      variant: 'success',
    }))
  } catch (error) {
    const errorMessage = invoke('toString')(error) || error

    yield put({
      type: actions.UPDATE_PROFILE_FAILED,
      payload: errorMessage,
    })
    yield put(openSnackbar({
      message: errorMessage,
      variant: 'error',
    }))
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
