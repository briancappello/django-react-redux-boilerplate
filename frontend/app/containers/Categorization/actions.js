import { createRoutine } from 'redux-saga-routines'

import {
  FETCH_CATEGORIES_IF_NEEDED,
  FETCH_CATEGORIES,
} from './constants'

export function fetchCategoriesIfNeeded() {
  return {
    type: FETCH_CATEGORIES_IF_NEEDED,
  }
}

export const fetchCategories = createRoutine(FETCH_CATEGORIES)
