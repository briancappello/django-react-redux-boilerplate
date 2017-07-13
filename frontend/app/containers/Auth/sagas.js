import { takeLatest, call, put, select } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { SERVER_URL } from 'config'
import { post, authedPost } from 'utils/request'

import { login, logout } from './actions'
import { selectToken } from './selectors'

export function* handleLogin({ payload }) {
  const loginUrl = `${SERVER_URL}/api/auth/login/`

  try {
    yield put(login.request())
    const { user, token } = yield call(post, loginUrl, {
      username: payload.username,
      password: payload.password,
    })
    _persistUserToken(user, token)
    yield put(login.success({ user, token }))
  } catch (error) {
    _removeUserToken()
    const { response } = error
    const formError = new SubmissionError({ _error: response.error })
    yield put(login.failure(formError))
  } finally {
    yield put(login.fulfill())
  }
}

export function* handleLogout() {
  const logoutUrl = `${SERVER_URL}/api/auth/logout/`
  const token = yield select(selectToken())

  // logout client-side regardless of server success/failure
  _removeUserToken()

  try {
    yield put(logout.request())
    yield call(authedPost, logoutUrl, token)
    yield put(logout.success())
  } catch (error) {
    yield put(logout.failure({ error: error.response }))
  } finally {
    yield put(logout.fulfill())
  }
}

export function* loginSaga() {
  yield takeLatest(login.TRIGGER, handleLogin)
}

export function* logoutSaga() {
  yield takeLatest(logout.TRIGGER, handleLogout)
}

export default [
  loginSaga,
  logoutSaga,
]

// private functions -----------------------------------------------

function _persistUserToken(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

function _removeUserToken() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
