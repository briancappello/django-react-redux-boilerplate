import { createSelector } from 'reselect';

export const selectBlog = (state) => state.get('blog')
export const selectCurrentPost = (state) => state.getIn(['blog', 'currentPost'])
export const selectPosts = (state) => state.getIn(['blog', 'posts'])

export const makeSelectBlog = () => createSelector(
  selectBlog,
  (state) => state.toJS()
)

export const makeSelectPostsLastUpdated = () => createSelector(
  selectPosts,
  (state) => state.get('lastUpdated')
)

export const makeSelectPostsFetching = () => createSelector(
  selectPosts,
  (state) => state.get('fetching')
)

export const makeSelectPosts = () => createSelector(
  selectPosts,
  (state) => {
    const order = state.get('order')
    if (!order.length) {
      return []
    }

    const bySlug = state.get('bySlug')
    return order.map((slug) => bySlug[slug])
  }
)

export const makeSelectCurrentPostSlug = () => createSelector(
  selectCurrentPost,
  (state) => state.get('slug')
)

export const makeSelectCurrentPostFetching = () => createSelector(
  selectCurrentPost,
  (state) => state.get('fetching')
)

export const makeSelectCurrentPost = () => createSelector(
  selectBlog,
  (state) => {
    const slug = state.getIn(['currentPost', 'slug'])
    if (!slug) {
      return null
    }
    return state.getIn(['posts', 'bySlug'])[slug]
  }
)
