/*
 *
 * Auth actions
 *
 */

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants'

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  }
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  }
}

export function login() {
  return {
    type: LOGIN,
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
