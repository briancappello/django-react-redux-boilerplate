import { fetchCategories } from './actions'

import { login, logout } from 'containers/Auth/actions'

const initialState = {
  categories: {
    slugs: [],
    bySlug: {},
    loading: false,
    fetching: false,
    error: null,
  },
}

/* eslint-disable no-shadow */
function categorizationReducer(state = initialState, action) {
  switch (action.type) {

    case login.SUCCESS:
    case logout.FULFILL:
      return { ...state,
        categories: { ...state.categories,
          slugs: [],
          bySlug: {},
        },
      }

    case fetchCategories.TRIGGER:
      return { ...state,
        categories: { ...state.categories,
          loading: true,
        },
      }

    case fetchCategories.REQUEST:
      return { ...state,
        categories: { ...state.categories,
          loading: true,
          fetching: true,
        },
      }

    case fetchCategories.SUCCESS:
      const { categories } = action.payload
      const slugs = []
      const bySlug = {}
      categories.forEach((category) => {
        slugs.push(category.slug)
        bySlug[category.slug] = category
      })
      return { ...state,
        categories: { ...state.categories,
          slugs,
          bySlug,
        },
      }

    case fetchCategories.FAILURE:
      return { ...state,
        categories: { ...state.categories,
          error: action.payload.error,
        },
      }

    case fetchCategories.FULFILL:
      return { ...state,
        categories: { ...state.categories,
          loading: false,
          fetching: false,
        },
      }

    default:
      return state
  }
}
/* eslint-enable */

export default categorizationReducer
