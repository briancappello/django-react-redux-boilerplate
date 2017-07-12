import {
  selectGlobal,
  makeSelectLocationState,
} from '../selectors'

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {}
    const mockedState = {
      global: globalState,
    }
    expect(selectGlobal(mockedState)).toEqual(globalState)
  })
})

describe('makeSelectLocationState', () => {
  const locationStateSelector = makeSelectLocationState()
  it('should select the route as a plain JS object', () => {
    const route = {
      locationBeforeTransitions: null,
    }
    const mockedState = {
      route,
    }
    expect(locationStateSelector(mockedState)).toEqual(route)
  })
})
