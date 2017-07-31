import { createSelector } from 'reselect'

export const selectCategories = (state) => state.categorization.categories
export const selectTags = (state) => state.categorization.tags


/**
 * categories
 * ==========
 */

export const makeSelectCategoriesError = () => createSelector(
  selectCategories,
  (state) => state.error
)

export const makeSelectCategoriesFetching = () => createSelector(
  selectCategories,
  (state) => state.fetching
)

export const makeSelectCategories = () => createSelector(
  selectCategories,
  (state) => state.slugs.map((slug) => state.bySlug[slug])
)

export const makeSelectCategoryBySlug = () => createSelector(
  (state, props) => selectCategories(state).bySlug[props.slug],
  (category) => category
)


/**
 * tags
 * ====
 */

export const makeSelectTagsError = () => createSelector(
  selectTags,
  (state) => state.error
)

export const makeSelectTagsFetching = () => createSelector(
  selectTags,
  (state) => state.fetching
)

export const makeSelectTags = () => createSelector(
  selectTags,
  (state) => state.slugs.map((slug) => state.bySlug[slug])
)

export const makeSelectTagBySlug = () => createSelector(
  (state, props) => selectTags(state).bySlug[props.slug],
  (tag) => tag
)
