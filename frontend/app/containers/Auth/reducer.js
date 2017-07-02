/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import { login, logout } from './actions'

const initialState = fromJS({
  user: _loadSessionUser(),
  token: _loadSessionToken(),
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case login.SUCCESS:
      const { user, token } = action.payload
      return state
        .set('user', user)
        .set('token', token)

    case logout.FULFILL:
      return state
        .set('user', null)
        .set('token', null)

    default:
      return state;
  }
}

// private functions ---------------------------------------------------

function _loadSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    return null
  }
}

function _loadSessionToken() {
  return localStorage.getItem('token')
}
