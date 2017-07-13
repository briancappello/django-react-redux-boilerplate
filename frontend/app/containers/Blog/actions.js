import { createRoutine } from 'redux-saga-routines'

import {
  FETCH_POST,
  FETCH_POST_IF_NEEDED,
  FETCH_POSTS,
  FETCH_POSTS_IF_NEEDED,
  SET_POSTS_BY_CATEGORY_CURRENT_CATEGORY_SLUG,
  FETCH_POSTS_BY_CATEGORY,
  FETCH_POSTS_BY_CATEGORY_IF_NEEDED,
} from './constants'

/**
 * Post Detail
 */

export const fetchPostIfNeeded = (slug) => ({
  type: FETCH_POST_IF_NEEDED,
  payload: { slug },
})

export const fetchPost = createRoutine(FETCH_POST)


/**
 * Posts
 */

export const fetchPostsIfNeeded = () => ({
  type: FETCH_POSTS_IF_NEEDED,
})

export const fetchPosts = createRoutine(FETCH_POSTS)


/**
 * Posts By Category
 */

export const setPostsByCategoryCurrentCategorySlug = (slug) => ({
  type: SET_POSTS_BY_CATEGORY_CURRENT_CATEGORY_SLUG,
  payload: { slug },
})

export const fetchPostsByCategoryIfNeeded = () => ({
  type: FETCH_POSTS_BY_CATEGORY_IF_NEEDED,
})

export const fetchPostsByCategory = createRoutine(FETCH_POSTS_BY_CATEGORY)
