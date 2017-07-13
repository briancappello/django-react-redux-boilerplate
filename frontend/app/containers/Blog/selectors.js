import { createSelector } from 'reselect'

export const selectBlog = (state) => state.blog
export const selectCurrentPost = (state) => state.blog.currentPost
export const selectPosts = (state) => state.blog.posts
export const selectPostsByCategory = (state) => state.blog.postsByCategory

/**
 * currentPost selectors
 * =====================
 */

export const makeSelectCurrentPost = () => createSelector(
  selectBlog,
  (state) => state.posts.bySlug[state.currentPost.slug]
)

export const makeSelectCurrentPostError = () => createSelector(
  selectCurrentPost,
  (state) => state.error
)

export const makeSelectCurrentPostFetching = () => createSelector(
  selectCurrentPost,
  (state) => state.fetching
)

export const makeSelectCurrentPostSlug = () => createSelector(
  selectCurrentPost,
  (state) => state.slug
)


/**
 * postsByCategory selectors
 * =========================
 */

export const makeSelectPostsByCategoryCurrentCategory = () => createSelector(
  selectPostsByCategory,
  (state) => state.currentCategory
)

export const makeSelectPostsByCategoryCurrentCategorySlug = () => createSelector(
  selectPostsByCategory,
  (state) => state.currentCategorySlug
)

export const makeSelectPostsByCategoryError = () => createSelector(
  selectPostsByCategory,
  (state) => state.error
)

export const makeSelectPostsByCategoryFetching = () => createSelector(
  selectPostsByCategory,
  (state) => state.fetching
)


/**
 * posts selectors
 * ===============
 */

export const makeSelectPosts = () => createSelector(
  selectPosts,
  (state) => state.slugs.map((slug) => state.bySlug[slug])
)

export const makeSelectPostsError = () => createSelector(
  selectPosts,
  (state) => state.error
)

export const makeSelectPostsFetching = () => createSelector(
  selectPosts,
  (state) => state.fetching
)

export const makeSelectPostsLastUpdated = () => createSelector(
  selectPosts,
  (state) => state.lastUpdated
)

export const makeSelectPostsBySlugs = () => createSelector(
  (state, props) => {
    const postsBySlug = selectPosts(state).bySlug
    return props.slugs.map((slug) => postsBySlug[slug])
  },
  (posts) => posts
)
