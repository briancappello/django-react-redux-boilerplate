import { fromJS } from 'immutable'

import {
  FETCH_POST_IF_NEEDED,
  SET_CURRENT_POSTS_CATEGORY_SLUG,
} from './constants'

import {
  fetchPost,
  fetchPosts,
  fetchPostsByCategory,
} from './actions'

import { login, logout } from 'containers/Auth/actions'

const initialState = fromJS({
  currentPost: {
    loading: false,
    fetching: false,
    error: null,
    slug: null,
  },
  postsByCategory: {
    currentCategorySlug: null,
    currentCategory: {
      name: null,
      posts: [],
    },
    loading: false,
    fetching: false,
    error: null,
  },
  posts: {
    loading: false,
    fetching: false,
    error: null,
    bySlug: {},
    slugs: [],
    lastUpdated: new Date(0),
  },
})

/* eslint-disable no-shadow */
function blogReducer(state = initialState, action) {
  switch (action.type) {

    case login.SUCCESS:
    case logout.FULFILL:
      return state
        .setIn(['postsByCategory', 'currentCategory', 'posts'], [])
        .setIn(['posts', 'slugs'], [])
        .setIn(['posts', 'bySlug'], {})
        .setIn(['posts', 'lastUpdated'], new Date(0))

    case SET_CURRENT_POSTS_CATEGORY_SLUG:
      return state
        .setIn(['postsByCategory', 'currentCategorySlug'], action.payload.slug)

    case FETCH_POST_IF_NEEDED:
      return state
        .setIn(['currentPost', 'slug'], action.payload.slug)

    case fetchPost.TRIGGER:
      return state
        .setIn(['currentPost', 'loading'], true)

    case fetchPost.REQUEST:
      return state
        .setIn(['currentPost', 'loading'], true)
        .setIn(['currentPost', 'fetching'], true)

    case fetchPost.SUCCESS:
      const { post, prev, next } = action.payload
      post.prev = prev
      post.next = next
      post.publishDate = new Date(post.publishDate)
      post.lastUpdated = new Date(post.lastUpdated)
      return state
        .setIn(['posts', 'bySlug'], {
          ...state.getIn(['posts', 'bySlug']),
          [post.slug]: post,
        })

    case fetchPost.FAILURE:
      return state
        .setIn(['currentPost', 'error'], action.payload.error)

    case fetchPost.FULFILL:
      return state
        .setIn(['currentPost', 'fetching'], false)
        .setIn(['currentPost', 'loading'], false)

    case fetchPosts.TRIGGER:
      return state
        .setIn(['posts', 'loading'], true)

    case fetchPosts.REQUEST:
      return state
        .setIn(['posts', 'loading'], true)
        .setIn(['posts', 'fetching'], true)

    case fetchPosts.SUCCESS:
      const { posts } = action.payload
      const bySlug = {}
      const slugs = []
      posts.forEach((post) => {
        bySlug[post.slug] = post
        slugs.push(post.slug)
      })
      return state
        .setIn(['posts', 'bySlug'], bySlug)
        .setIn(['posts', 'slugs'], slugs)
        .setIn(['posts', 'lastUpdated'], new Date())

    case fetchPosts.FAILURE:
      return state
        .setIn(['posts', 'error'], action.payload.error)

    case fetchPosts.FULFILL:
      return state
        .setIn(['posts', 'loading'], false)
        .setIn(['posts', 'fetching'], false)

    case fetchPostsByCategory.TRIGGER:
      return state
        .setIn(['postsByCategory', 'loading'], true)

    case fetchPostsByCategory.REQUEST:
      return state
        .setIn(['postsByCategory', 'loading'], true)
        .setIn(['postsByCategory', 'fetching'], true)

    case fetchPostsByCategory.SUCCESS:
      return state
        .setIn(['postsByCategory', 'currentCategory'], action.payload.category)

    case fetchPostsByCategory.FAILURE:
      return state
        .setIn(['postsByCategory', 'error'], action.payload.error)

    case fetchPostsByCategory.FULFILL:
      return state
        .setIn(['postsByCategory', 'loading'], false)
        .setIn(['postsByCategory', 'fetching'], false)

    default:
      return state
  }
}
/* eslint-enable */

export default blogReducer
