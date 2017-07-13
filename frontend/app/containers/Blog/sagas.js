import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'

import { SERVER_URL } from 'config'
import { isObject, isTruthy } from 'utils/types'
import { authedGet, authedPost } from 'utils/request'
import { makeSelectToken } from 'containers/Auth/selectors'

import {
  fetchPost,
  fetchPosts,
  fetchPostsByCategory,
} from './actions'

import {
  FETCH_POST_IF_NEEDED,
  FETCH_POSTS_IF_NEEDED,
  FETCH_POSTS_BY_CATEGORY_IF_NEEDED,
} from './constants'

import {
  makeSelectCurrentPostSlug,
  makeSelectCurrentPost,
  makeSelectCurrentPostError,
  makeSelectCurrentPostFetching,
  makeSelectPosts,
  makeSelectPostsBySlugs,
  makeSelectPostsLastUpdated,
  makeSelectPostsError,
  makeSelectPostsFetching,
  makeSelectCurrentPostsCategory,
  makeSelectCurrentPostsCategoryError,
  makeSelectCurrentPostsCategoryFetching,
  makeSelectCurrentPostsCategorySlug,
} from './selectors'

import { makeSelectCategoryBySlug } from 'containers/Categorization/selectors'

const MINUTE = 60 * 1000  // in millis
const FIVE_MINUTES = 5 * MINUTE

function* handleFetchPostIfNeeded() {
  const isFetching = yield select(makeSelectCurrentPostFetching())
  const hasError = yield select(makeSelectCurrentPostError())
  if (isFetching || hasError) {
    return
  }

  const post = yield select(makeSelectCurrentPost())
  if (!post || !post.html) {
    yield call(handleFetchPost)
  }
}

function* handleFetchPost() {
  const slug = yield select(makeSelectCurrentPostSlug())
  const token = yield select(makeSelectToken())
  const postDetailUrl = `${SERVER_URL}/api/posts/${slug}/`

  try {
    yield put(fetchPost.request())
    const { post, prev, next } = yield call(authedGet, postDetailUrl, token)
    yield put(fetchPost.success({ post, prev, next }))
  } catch (error) {
    yield put(fetchPost.failure({ error: error.response }))
  } finally {
    yield put(fetchPost.fulfill())
  }
}

function* handleFetchPostsIfNeeded() {
  const isFetching = yield select(makeSelectPostsFetching())
  const hasError = yield select(makeSelectPostsError())
  if (isFetching || hasError) {
    return
  }

  const lastUpdated = yield select(makeSelectPostsLastUpdated())
  const now = new Date()
  const posts = yield select(makeSelectPosts())
  if ((!lastUpdated && !isTruthy(posts)) || now - lastUpdated > FIVE_MINUTES) {
    yield call(handleFetchPosts)
  }
}

function* handleFetchPosts() {
  const listPostsUrl = `${SERVER_URL}/api/posts/`
  const token = yield select(makeSelectToken())
  const lastUpdated = yield select(makeSelectPostsLastUpdated())

  try {
    yield put(fetchPosts.request())
    const posts = yield call(authedPost, listPostsUrl, token, { lastUpdated })
    yield put(fetchPosts.success({ posts }))
  } catch (error) {
    yield put(fetchPosts.failure({ error: error.response }))
  } finally {
    yield put(fetchPosts.fulfill())
  }
}

function* handleFetchPostsByCategoryIfNeeded() {
  const isFetching = yield select(makeSelectCurrentPostsCategoryFetching())
  const hasError = yield select(makeSelectCurrentPostsCategoryError())
  if (isFetching || hasError) {
    return
  }

  // check if blog.postsByCategory.currentCategory is already correctly set
  const categorySlug = yield select(makeSelectCurrentPostsCategorySlug())
  const currentCategory = yield select(makeSelectCurrentPostsCategory())
  if (categorySlug === currentCategory.slug) {
    return
  }

  // otherwise try to pull the category from categorization.categories
  const category = yield select(makeSelectCategoryBySlug(), { slug: categorySlug })
  if (category && category.posts && category.posts.length) {
    // check if its posts data has already been populated
    if (isObject(category.posts[0])) {
      yield put(fetchPostsByCategory.success({ category }))
      yield put(fetchPostsByCategory.fulfill())
      return
    }

    // otherwise check if we have the necessary data loaded in blog.posts
    const posts = yield select(makeSelectPostsBySlugs(), { slugs: category.posts })
    if (posts.filter((x) => x).length === posts.length) {
      category.posts = posts
      yield put(fetchPostsByCategory.success({ category }))
      yield put(fetchPostsByCategory.fulfill())
      return
    }
  }

  // if we got here, gotta fetch the data from the server
  yield call(handleFetchPostsByCategory)
}

function* handleFetchPostsByCategory() {
  const categorySlug = yield select(makeSelectCurrentPostsCategorySlug())
  const postsByCategoryUrl = `${SERVER_URL}/api/categories/${categorySlug}/`
  const token = yield select(makeSelectToken())

  try {
    yield put(fetchPostsByCategory.request())
    const category = yield call(authedGet, postsByCategoryUrl, token)
    yield put(fetchPostsByCategory.success({ category }))
  } catch (error) {
    yield put(fetchPostsByCategory.failure({ error: error.response }))
  } finally {
    yield put(fetchPostsByCategory.fulfill())
  }
}

function* watchFetchPostIfNeeded() {
  yield takeEvery(FETCH_POST_IF_NEEDED, handleFetchPostIfNeeded)
}

function* watchFetchPost() {
  yield takeLatest(fetchPost.TRIGGER, handleFetchPost)
}

function* watchFetchPostsIfNeeded() {
  yield takeEvery(FETCH_POSTS_IF_NEEDED, handleFetchPostsIfNeeded)
}

function* watchFetchPosts() {
  yield takeLatest(fetchPosts.TRIGGER, handleFetchPosts)
}

function* watchFetchPostsByCategoryIfNeeded() {
  yield takeEvery(FETCH_POSTS_BY_CATEGORY_IF_NEEDED, handleFetchPostsByCategoryIfNeeded)
}

export default [
  watchFetchPostIfNeeded,
  watchFetchPost,
  watchFetchPostsIfNeeded,
  watchFetchPosts,
  watchFetchPostsByCategoryIfNeeded,
]
