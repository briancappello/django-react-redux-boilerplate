import { createSelector } from 'reselect'

import { selectCategories, selectTags } from 'containers/Categorization/selectors'

export const selectCurrentPost = (state) => state.blog.currentPost
export const selectPosts = (state) => state.blog.posts
export const selectPostsByCategory = (state) => state.blog.postsByCategory

/**
 * currentPost selectors
 * =====================
 */

export const makeSelectCurrentPost = () => createSelector(
  [selectCurrentPost, selectPosts],
  (currentPost, posts) => posts.bySlug[currentPost.slug]
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
  [selectPosts, selectCategories, selectTags],
  (posts, categories, tags) => _populatePosts(posts.slugs.map((slug) => posts.bySlug[slug]), categories, tags)
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
    const posts = selectPosts(state)
    const categories = selectCategories(state)
    const tags = selectTags(state)
    return _populatePosts(props.slugs.map((slug) => posts.bySlug[slug]), categories, tags)
  },
  (posts) => posts
)

export const _populatePosts = (posts, categories, tags) => posts.map((post) => {
  return _populatePost(post, categories, tags)
})

export const _populatePost = (post, categories, tags) => {
  if (!post || post.html) {
    return post
  }

  const populated = { ...post }
  populated.category = categories.bySlug[post.category]
  if (post.tags.length) {
    populated.tags = post.tags.map((tagSlug) => tags.bySlug[tagSlug])
  }
  return populated
}
