import { fromJS } from 'immutable'

import { fetchCategories } from './actions'

const initialState = fromJS({
  categories: {
    ids: [],
    byId: {},
    slugIds: {},
    loading: false,
    fetching: false,
    error: null,
  },
})

/* eslint-disable no-shadow */
function categorizationReducer(state = initialState, action) {
  const ids = []
  const byId = {}
  const slugIds = {}

  switch (action.type) {

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
        ids.push(category.id)
        byId[category.id] = category
        slugIds[category.slug] = category.id
      })
      return state
        .setIn(['categories', 'ids'], ids)
        .setIn(['categories', 'byId'], byId)
        .setIn(['categories', 'slugIds'], slugIds)

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
