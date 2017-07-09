import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'

import { SERVER_URL } from 'config'
import { authedGet } from 'utils/request'
import { selectToken } from 'containers/Auth/selectors'

import { fetchPost, fetchPosts } from './actions'
import { FETCH_POST_IF_NEEDED, FETCH_POSTS_IF_NEEDED } from './constants'
import {
  makeSelectCurrentPostSlug,
  makeSelectCurrentPost,
  makeSelectCurrentPostFetching,
  makeSelectPostsLastUpdated,
  makeSelectPostsFetching,
} from './selectors'

const MINUTE = 60 * 1000  // in millis
const _30_MINUTES = 30 * MINUTE

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
    yield put(fetchPost.failure({ error }))
  } finally {
    yield put(fetchPost.fulfill())
  }
}

function* handleFetchPostsIfNeeded() {
  const isFetching = yield select(makeSelectPostsFetching())
  if (isFetching) {
    return
  }

  /**
   * FIXME: maybe better to just POST the last updated timestamp to
   * the server and let it return any new/updated posts or not
   */
  const lastUpdated = yield select(makeSelectPostsLastUpdated())
  const now = new Date()
  if (!lastUpdated || now - lastUpdated > _30_MINUTES) {
    yield call(handleFetchPosts)
  }
}

function* handleFetchPosts() {
  const listPostsUrl = `${SERVER_URL}/api/posts/`
  const token = yield select(selectToken())

  try {
    yield put(fetchPosts.request())
    const posts = yield call(authedGet, listPostsUrl, token)
    yield put(fetchPosts.success({ posts }))
  } catch (error) {
    yield put(fetchPosts.failure({ error }))
  } finally {
    yield put(fetchPosts.fulfill())
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

export default [
  watchFetchPostIfNeeded,
  watchFetchPost,
  watchFetchPostsIfNeeded,
  watchFetchPosts,
]
