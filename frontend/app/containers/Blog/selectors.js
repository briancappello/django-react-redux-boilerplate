import { createSelector } from 'reselect'

export const selectBlog = (state) => state.blog
export const selectCurrentPost = (state) => state.blog.currentPost
export const selectPosts = (state) => state.blog.posts
export const selectPostsByCategory = (state) => state.blog.postsByCategory

export const makeSelectPostsLastUpdated = () => createSelector(
  selectPosts,
  (state) => state.lastUpdated
)

export const makeSelectPostsError = () => createSelector(
  selectPosts,
  (state) => state.error
)

export const makeSelectPostsFetching = () => createSelector(
  selectPosts,
  (state) => state.fetching
)

export const makeSelectPosts = () => createSelector(
  selectPosts,
  (state) => state.slugs.map((slug) => state.bySlug[slug])
)

export const makeSelectPostsBySlugs = () => createSelector(
  (state, props) => {
    const postsBySlug = selectPosts(state).bySlug
    return props.slugs.map((slug) => postsBySlug[slug])
  },
  (posts) => posts
)

export const makeSelectCurrentPostSlug = () => createSelector(
  selectCurrentPost,
  (state) => state.slug
)

export const makeSelectCurrentPostError = () => createSelector(
  selectCurrentPost,
  (state) => state.error
)

export const makeSelectCurrentPostFetching = () => createSelector(
  selectCurrentPost,
  (state) => state.fetching
)

export const makeSelectCurrentPost = () => createSelector(
  selectBlog,
  (state) => {
    const slug = state.currentPost.slug
    if (!slug) {
      return null
    }
    return state.posts.bySlug[slug]
  }
)

export const makeSelectCurrentPostsCategoryError = () => createSelector(
  selectPostsByCategory,
  (state) => state.error
)

export const makeSelectCurrentPostsCategoryFetching = () => createSelector(
  selectPostsByCategory,
  (state) => state.fetching
)

export const makeSelectCurrentPostsCategorySlug = () => createSelector(
  selectPostsByCategory,
  (state) => state.currentCategorySlug
)

export const makeSelectCurrentPostsCategory = () => createSelector(
  selectPostsByCategory,
  (state) => state.currentCategory
)
