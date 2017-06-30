import { takeLatest, call, put, select } from 'redux-saga/effects';

import { SERVER_URL } from 'config'
import { post, authedPost } from 'utils/request'
import { LOGIN, LOGOUT } from './constants'
import { loginSuccess, loginError, logoutSuccess, logoutError } from './actions'
import { selectForm, selectToken } from './selectors'

function _persistUserToken(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

function _removeUserToken() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export function* login() {
  const loginUrl = `${SERVER_URL}/api/auth/login/`
  const formData = yield select(selectForm())

  try {
    const { user, token } = yield call(post, loginUrl, formData)
    _persistUserToken(user, token)
    yield put(loginSuccess(user, token))
  } catch (error) {
    _removeUserToken()
    yield put(loginError(error))
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
    yield put(logoutError(error))
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
