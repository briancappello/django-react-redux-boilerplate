/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  user: _loadSessionUser(),
  token: _loadSessionToken(),
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN:
      return state
        .set('error', false)

    case LOGIN_SUCCESS:
      return state
        .set('user', action.user)
        .set('token', action.token)

    case LOGIN_ERROR:
      return state
        .set('error', action.error)

    case LOGOUT:
      return state
        .set('error', false)

    case LOGOUT_SUCCESS:
      return state
        .set('user', null)
        .set('token', null)

    case LOGOUT_ERROR:
      return state
        .set('error', action.error)

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
