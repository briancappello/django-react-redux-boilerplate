/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';

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

const initialState = fromJS({
  form: {
    username: null,
    password: null,
  },
  loading: false,
  error: false,
  user: _loadSessionUser(),
  token: _loadSessionToken(),
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_USERNAME:
      return state
        .setIn(['form', 'username'], action.username)

    case CHANGE_PASSWORD:
      return state
        .setIn(['form', 'password'], action.password)

    case LOGIN:
      return state
        .set('loading', true)
        .set('error', false)

    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', action.user)
        .set('token', action.token)

    case LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)

    case LOGOUT:
      return state
        .set('loading', true)
        .set('error', false)

    case LOGOUT_SUCCESS:
      return state
        .set('loading', false)
        .set('user', null)
        .set('token', null)

    case LOGOUT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)

    default:
      return state;
  }
}
