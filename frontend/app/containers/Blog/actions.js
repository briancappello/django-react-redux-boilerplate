import { createRoutine } from 'redux-saga-routines'

import {
  FETCH_POST,
  FETCH_POST_IF_NEEDED,
  FETCH_POSTS,
  FETCH_POSTS_IF_NEEDED,
} from './constants'

export function fetchPostIfNeeded(slug) {
  return {
    type: FETCH_POST_IF_NEEDED,
    payload: {
      slug,
    },
  }
}

export const fetchPost = createRoutine(FETCH_POST)

export function fetchPostsIfNeeded() {
  return {
    type: FETCH_POSTS_IF_NEEDED,
  }
}

export const fetchPosts = createRoutine(FETCH_POSTS)
