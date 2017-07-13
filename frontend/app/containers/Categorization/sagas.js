import { takeEvery, call, put, select } from 'redux-saga/effects'

import { SERVER_URL } from 'config'
import { authedGet } from 'utils/request'
import { makeSelectToken } from 'containers/Auth/selectors'

import {
  FETCH_CATEGORIES_IF_NEEDED,
} from './constants'

import {
  fetchCategories,
} from './actions'

import {
  makeSelectCategories,
  makeSelectCategoriesError,
  makeSelectCategoriesFetching,
} from './selectors'

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

export function* watchFetchCategoriesIfNeeded() {
  yield takeEvery(FETCH_CATEGORIES_IF_NEEDED, handleFetchCategoriesIfNeeded)
}

export default [
  watchFetchCategoriesIfNeeded,
]
