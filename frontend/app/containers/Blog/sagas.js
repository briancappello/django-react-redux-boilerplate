import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'

import { SERVER_URL } from 'config'
import { isObject, isTruthy } from 'utils/types'
import { authedGet, authedPost } from 'utils/request'
import { selectToken } from 'containers/Auth/selectors'

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
  makeSelectCurrentPostFetching,
  makeSelectPosts,
  makeSelectPostsBySlugs,
  makeSelectPostsLastUpdated,
  makeSelectPostsFetching,
  makeSelectCurrentPostsCategory,
  makeSelectCurrentPostsCategorySlug,
} from './selectors'

import { makeSelectCategoryBySlug } from 'containers/Categorization/selectors'

const MINUTE = 60 * 1000  // in millis
const FIVE_MINUTES = 5 * MINUTE

function* handleFetchPostIfNeeded() {
  const isFetching = yield select(makeSelectCurrentPostFetching())
  if (isFetching) {
    return
  }

  const post = yield select(makeSelectCurrentPost())
  if (!post || !post.html) {
    yield call(handleFetchPost)
  }
}

function* handleFetchPost() {
  const slug = yield select(makeSelectCurrentPostSlug())
  const token = yield select(selectToken())
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
  if (isFetching) {
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
  const token = yield select(selectToken())
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
  const categorySlug = yield select(makeSelectCurrentPostsCategorySlug())

  // check if blog.postsByCategory.currentCategory is already correctly set
  let category = yield select(makeSelectCurrentPostsCategory())
  if (categorySlug === category.slug) {
    return
  }

  // otherwise try to pull the category from categorization.categories
  category = yield select(makeSelectCategoryBySlug(), { slug: categorySlug })
  if (category && category.posts && category.posts.length) {
    // check if its posts data has already been populated
    if (isObject(category.posts[0])) {
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
  const token = yield select(selectToken())

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
