/*
 *
 * Auth actions
 *
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants'

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  }
}

export function loginSuccess(user, token) {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  }
}
