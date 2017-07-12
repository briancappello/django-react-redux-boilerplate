import { fromJS } from 'immutable'

import { fetchCategories } from './actions'

import { login, logout } from 'containers/Auth/actions'

const initialState = fromJS({
  categories: {
    slugs: [],
    bySlug: {},
    loading: false,
    fetching: false,
    error: null,
  },
})

/* eslint-disable no-shadow */
function categorizationReducer(state = initialState, action) {
  const slugs = []
  const bySlug = {}

  switch (action.type) {

    case login.SUCCESS:
    case logout.FULFILL:
      return state
        .setIn(['categories', 'slugs'], [])
        .setIn(['categories', 'bySlug'], {})

    case fetchCategories.TRIGGER:
      return state
        .setIn(['categories', 'loading'], true)

    case fetchCategories.REQUEST:
      return state
        .setIn(['categories', 'loading'], true)
        .setIn(['categories', 'fetching'], true)

    case fetchCategories.SUCCESS:
      const { categories } = action.payload
      categories.forEach((category) => {
        slugs.push(category.slug)
        bySlug[category.slug] = category
      })
      return state
        .setIn(['categories', 'slugs'], slugs)
        .setIn(['categories', 'bySlug'], bySlug)

    case fetchCategories.FAILURE:
      return state
        .setIn(['categories', 'error'], action.payload.error)

    case fetchCategories.FULFILL:
      return state
        .setIn(['categories', 'loading'], false)
        .setIn(['categories', 'fetching'], false)

    default:
      return state
  }
}
/* eslint-enable */

export default categorizationReducer
