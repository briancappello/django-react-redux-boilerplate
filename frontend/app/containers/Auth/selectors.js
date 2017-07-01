import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = (state) => state.get('auth')

/**
 * Other specific selectors
 */
export const selectError = () => createSelector(
  selectAuthDomain,
  (state) => state.get('error')
)

export const selectUser = () => createSelector(
  selectAuthDomain,
  (state) => state.get('user')
)

export const selectToken = () => createSelector(
  selectAuthDomain,
  (substate) => substate.get('token')
)

/**
 * Default selector used by Auth
 */
export const makeSelectAuth = () => createSelector(
  selectAuthDomain,
  (substate) => substate.toJS()
);

export default makeSelectAuth;
