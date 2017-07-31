import { LOCATION_CHANGE } from 'react-router-redux'

import { fetchCategories, fetchTags } from './actions'

import { login, logout } from 'containers/Auth/actions'


const initialState = {
  categories: {
    slugs: [],
    bySlug: {},
    loading: false,
    fetching: false,
    error: null,
  },
  tags: {
    slugs: [],
    bySlug: {},
    loading: false,
    fetching: false,
    error: null,
  },
}

/* eslint-disable no-shadow */
function categorizationReducer(state = initialState, action) {
  const slugs = []
  const bySlug = {}

  switch (action.type) {

    case LOCATION_CHANGE:
      return { ...state,
        categories: { ...state.categories,
          error: null,
        },
        tags: { ...state.tags,
          error: null,
        },
      }

    case login.SUCCESS:
    case logout.FULFILL:
      return { ...state,
        categories: { ...state.categories,
          slugs: [],
          bySlug: {},
        },
        tags: { ...state.tags,
          slugs: [],
          bySlug: {},
        },
      }


    /**
     * fetch categories
     * ================
     */

    case fetchCategories.REQUEST:
      return { ...state,
        categories: { ...state.categories,
          loading: true,
          fetching: true,
        },
      }

    case fetchCategories.SUCCESS:
      action.payload.categories.forEach((category) => {
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


    /**
     * fetch tags
     * ==========
     */

    case fetchTags.REQUEST:
      return { ...state,
        tags: { ...state.tags,
          loading: true,
          fetching: true,
        },
      }

    case fetchTags.SUCCESS:
      action.payload.tags.forEach((tag) => {
        slugs.push(tag.slug)
        bySlug[tag.slug] = tag
      })
      return { ...state,
        tags: { ...state.tags,
          slugs,
          bySlug,
        },
      }

    case fetchTags.FAILURE:
      return { ...state,
        tags: { ...state.tags,
          error: action.payload.error,
        },
      }

    case fetchTags.FULFILL:
      return { ...state,
        tags: { ...state.tags,
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
