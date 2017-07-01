/*
 * Auth actions
 */
import { createFormAction } from 'redux-form-saga'

import {
  LOGIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants'

export const login = createFormAction(LOGIN)

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
