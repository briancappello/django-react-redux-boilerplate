import { takeLatest, call, put, select } from 'redux-saga/effects';

import { SERVER_URL } from 'config'
import { post, authedPost } from 'utils/request'
import { LOGIN, LOGOUT } from './constants'
import { loginSuccess, loginError, logoutSuccess, logoutError } from './actions'
import { selectToken } from './selectors'

function _persistUserToken(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

function _removeUserToken() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export function* login({ username, password }) {
  const loginUrl = `${SERVER_URL}/api/auth/login/`

  try {
    const { user, token } = yield call(post, loginUrl, { username, password })
    _persistUserToken(user, token)
    yield put(loginSuccess(user, token))
  } catch (error) {
    _removeUserToken()
    const { response } = error
    yield put(loginError(response.error))
  }
}

export function* logout() {
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
  yield takeLatest(LOGIN, login)
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT, logout)
}

export default [
  loginSaga,
  logoutSaga,
];
