import { createSelector } from 'reselect'

export const selectAuthDomain = (state) => state.auth

export const makeSelectToken = () => createSelector(
  selectAuthDomain,
  (state) => state.token
)

export const makeSelectUser = () => createSelector(
  selectAuthDomain,
  (state) => state.user
)
