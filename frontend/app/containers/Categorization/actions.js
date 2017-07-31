import { createRoutine } from 'redux-saga-routines'

import {
  FETCH_CATEGORIES_IF_NEEDED,
  FETCH_CATEGORIES,
  FETCH_TAGS_IF_NEEDED,
  FETCH_TAGS,
} from './constants'

export const fetchCategoriesIfNeeded = () => ({
  type: FETCH_CATEGORIES_IF_NEEDED,
})

export const fetchCategories = createRoutine(FETCH_CATEGORIES)

export const fetchTagsIfNeeded = () => ({
  type: FETCH_TAGS_IF_NEEDED,
})

export const fetchTags = createRoutine(FETCH_TAGS)
