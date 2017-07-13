import { createSelector } from 'reselect'

export const selectCategories = (state) => state.categorization.categories

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
