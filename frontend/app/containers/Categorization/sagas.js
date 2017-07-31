import { takeEvery, call, put, select } from 'redux-saga/effects'

import { SERVER_URL } from 'config'
import { authedGet } from 'utils/request'
import { makeSelectToken } from 'containers/Auth/selectors'

import {
  FETCH_CATEGORIES_IF_NEEDED,
  FETCH_TAGS_IF_NEEDED,
} from './constants'

import {
  fetchCategories,
  fetchTags,
} from './actions'

import {
  makeSelectCategories,
  makeSelectCategoriesError,
  makeSelectCategoriesFetching,

  makeSelectTags,
  makeSelectTagsError,
  makeSelectTagsFetching,
} from './selectors'


/**
 * fetch categories
 * ================
 */

export function* handleFetchCategoriesIfNeeded() {
  const categories = yield select(makeSelectCategories())
  const isFetching = yield select(makeSelectCategoriesFetching())
  const hasError = yield select(makeSelectCategoriesError())
  if (isFetching || hasError || (categories && categories.length)) {
    return
  }

  yield call(handleFetchCategories)
}

export function* handleFetchCategories() {
  const listCategoriesUrl = `${SERVER_URL}/api/categories/`
  const token = yield select(makeSelectToken())

  try {
    yield put(fetchCategories.request())
    const response = yield call(authedGet, listCategoriesUrl, token)
    yield put(fetchCategories.success({ categories: response.results }))
  } catch (error) {
    yield put(fetchCategories.failure({ error: error.response }))
  } finally {
    yield put(fetchCategories.fulfill())
  }
}


/**
 * fetch tags
 * ================
 */

export function* handleFetchTagsIfNeeded() {
  const tags = yield select(makeSelectTags())
  const isFetching = yield select(makeSelectTagsFetching())
  const hasError = yield select(makeSelectTagsError())
  if (isFetching || hasError || (tags && tags.length)) {
    return
  }

  yield call(handleFetchTags)
}

export function* handleFetchTags() {
  const listTagsUrl = `${SERVER_URL}/api/tags/`
  const token = yield select(makeSelectToken())

  try {
    yield put(fetchTags.request())
    const response = yield call(authedGet, listTagsUrl, token)
    yield put(fetchTags.success({ tags: response.results }))
  } catch (error) {
    yield put(fetchTags.failure({ error: error.response }))
  } finally {
    yield put(fetchTags.fulfill())
  }
}


/**
 * watchers
 * ========
 */

export function* watchFetchCategoriesIfNeeded() {
  yield takeEvery(FETCH_CATEGORIES_IF_NEEDED, handleFetchCategoriesIfNeeded)
}

export function* watchFetchTagsIfNeeded() {
  yield takeEvery(FETCH_TAGS_IF_NEEDED, handleFetchTagsIfNeeded)
}

export default [
  watchFetchCategoriesIfNeeded,
  watchFetchTagsIfNeeded,
]
