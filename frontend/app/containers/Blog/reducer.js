import { fromJS } from 'immutable'

import { FETCH_POST_IF_NEEDED } from './constants'
import { fetchPost, fetchPosts } from './actions'

const initialState = fromJS({
  currentPost: {
    loading: false,
    fetching: false,
    error: null,
    slug: null,
  },
  posts: {
    loading: false,
    fetching: false,
    error: null,
    bySlug: {},
    order: [],
    lastUpdated: null,
  },
})

/* eslint-disable no-shadow */
function blogReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_POST_IF_NEEDED:
      return state
        .setIn(['currentPost', 'slug'], action.payload.slug)

    case fetchPost.TRIGGER:
      return state
        .setIn(['currentPost', 'loading'], true)

    case fetchPost.REQUEST:
      return state
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
        .setIn(['posts', 'fetching'], true)

    case fetchPosts.SUCCESS:
      const { posts } = action.payload
      const bySlug = {}
      const order = []
      posts.forEach((post) => {
        bySlug[post.slug] = post
        order.push(post.slug)
      })
      return state
        .setIn(['posts', 'bySlug'], bySlug)
        .setIn(['posts', 'order'], order)
        .setIn(['posts', 'lastUpdated'], new Date())

    case fetchPosts.FAILURE:
      return state
        .setIn(['posts', 'error'], action.payload.error)

    case fetchPosts.FULFILL:
      return state
        .setIn(['posts', 'loading'], false)
        .setIn(['posts', 'fetching'], false)

    default:
      return state
  }
}
/* eslint-enable */

export default blogReducer
