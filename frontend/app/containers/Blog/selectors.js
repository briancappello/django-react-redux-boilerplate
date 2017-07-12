import { createSelector } from 'reselect';

export const selectBlog = (state) => state.get('blog')
export const selectCurrentPost = (state) => state.getIn(['blog', 'currentPost'])
export const selectPosts = (state) => state.getIn(['blog', 'posts'])
export const selectPostsByCategory = (state) => state.getIn(['blog', 'postsByCategory'])

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
    const slugs = state.get('slugs')
    if (!slugs.length) {
      return []
    }

    const bySlug = state.get('bySlug')
    return slugs.map((slug) => bySlug[slug])
  }
)

export const makeSelectPostsBySlugs = () => createSelector(
  (state, props) => {
    const postsBySlug = selectPosts(state).get('bySlug')
    return props.slugs.map((slug) => postsBySlug[slug])
  },
  (posts) => posts
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

export const makeSelectCurrentPostsCategorySlug = () => createSelector(
  selectPostsByCategory,
  (state) => state.get('currentCategorySlug')
)

export const makeSelectCurrentPostsCategory = () => createSelector(
  selectPostsByCategory,
  (state) => state.get('currentCategory')
)
