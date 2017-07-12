/**
 * The global state selectors
 */

// import { createSelector } from 'reselect'

const selectGlobal = (state) => state.global

const makeSelectLocationState = () => {
  let prevRoutingState

  return (state) => {
    const routingState = state.route

    if (!routingState !== prevRoutingState) {
      prevRoutingState = routingState
    }

    return prevRoutingState
  }
}

export {
  selectGlobal,
  makeSelectLocationState,
}
