import { createSelector } from 'reselect'

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = (state) => state.auth

/**
 * Other specific selectors
 */
export const selectUser = () => createSelector(
  selectAuthDomain,
  (state) => state.user
)

export const selectToken = () => createSelector(
  selectAuthDomain,
  (state) => state.token
)

/**
 * Default selector used by Auth
 */
export const makeSelectAuth = () => createSelector(
  selectAuthDomain,
  (state) => state
)

export default makeSelectAuth
