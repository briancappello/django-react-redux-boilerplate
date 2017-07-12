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

const initialState = {
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
}

/* eslint-disable no-shadow */
function blogReducer(state = initialState, action) {
  switch (action.type) {

    case login.SUCCESS:
    case logout.FULFILL:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          currentCategory: {
            ...state.postsByCategory.currentCategory,
            posts: [],
          },
        },
        posts: {
          ...state.posts,
          slugs: [],
          bySlug: {},
          lastUpdated: new Date(0),
        },
      }

    case SET_CURRENT_POSTS_CATEGORY_SLUG:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          currentCategorySlug: action.payload.slug,
        },
      }

    case FETCH_POST_IF_NEEDED:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          slug: action.payload.slug,
        },
      }

    case fetchPost.TRIGGER:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          loading: true,
        },
      }

    case fetchPost.REQUEST:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          loading: true,
          fetching: true,
        },
      }

    case fetchPost.SUCCESS:
      const { post, prev, next } = action.payload
      post.prev = prev
      post.next = next
      post.publishDate = new Date(post.publishDate)
      post.lastUpdated = new Date(post.lastUpdated)
      return {
        ...state,
        posts: {
          ...state.posts,
          bySlug: {
            ...state.posts.bySlug,
            [post.slug]: post,
          },
        },
      }

    case fetchPost.FAILURE:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          error: action.payload.error,
        },
      }

    case fetchPost.FULFILL:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          fetching: false,
          loading: false,
        },
      }

    case fetchPosts.TRIGGER:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
        },
      }

    case fetchPosts.REQUEST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
          fetching: true,
        },
      }

    case fetchPosts.SUCCESS:
      const { posts: newPosts } = action.payload
      const bySlug = {}
      const slugs = []
      state.posts.slugs.forEach((slug) => {
        bySlug[slug] = state.posts.bySlug[slug]
        slugs.push(slug)
      })
      newPosts.forEach((post) => {
        bySlug[post.slug] = post
        if (slugs.indexOf(post.slug) === -1) {
          slugs.push(post.slug)
        }
      })
      return {
        ...state,
        posts: {
          ...state.posts,
          bySlug,
          slugs,
          lastUpdated: new Date(),
        },
      }

    case fetchPosts.FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          error: action.payload.error,
        },
      }

    case fetchPosts.FULFILL:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          fetching: false,
        },
      }

    case fetchPostsByCategory.TRIGGER:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          loading: true,
        },
      }
    case fetchPostsByCategory.REQUEST:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          loading: true,
          fetching: true,
        },
      }

    case fetchPostsByCategory.SUCCESS:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          currentCategory: action.payload.category,
        },
      }

    case fetchPostsByCategory.FAILURE:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          error: action.payload.error,
        },
      }

    case fetchPostsByCategory.FULFILL:
      return {
        ...state,
        postsByCategory: {
          ...state.postsByCategory,
          loading: false,
          fetching: false,
        },
      }

    default:
      return state
  }
}
/* eslint-enable */

export default blogReducer
