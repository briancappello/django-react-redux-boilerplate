/*
 * Auth actions
 */
import { createRoutine } from 'redux-saga-routines'

import {
  LOGIN,
  LOGOUT,
} from './constants'

export const login = createRoutine(LOGIN)
export const logout = createRoutine(LOGOUT)
