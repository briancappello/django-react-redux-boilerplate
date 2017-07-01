import { takeLatest, call, put, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';

import { SERVER_URL } from 'config'
import { post, authedPost } from 'utils/request'

import { LOGOUT } from './constants'
import { login, logoutSuccess, logoutError } from './actions'
import { selectToken } from './selectors'

function _persistUserToken(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

function _removeUserToken() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export function* handleLogin({ payload: { username, password } }) {
  const loginUrl = `${SERVER_URL}/api/auth/login/`

  try {
    const { user, token } = yield call(post, loginUrl, { username, password })
    _persistUserToken(user, token)
    yield put(login.success({ user, token }))
  } catch (error) {
    _removeUserToken()
    const { response } = error
    const formError = new SubmissionError({ _error: response.error })
    yield put(login.failure(formError))
  }
}

export function* handleLogout() {
  const logoutUrl = `${SERVER_URL}/api/auth/logout/`
  const token = yield select(selectToken())

  try {
    yield call(authedPost, token, logoutUrl)
    _removeUserToken()
    yield put(logoutSuccess())
  } catch (error) {
    const { response } = error
    yield put(logoutError(response.error))
  }
}

export function* loginSaga() {
  yield takeLatest(login.REQUEST, handleLogin)
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT, handleLogout)
}

export default [
  loginSaga,
  logoutSaga,
];
