import { createSelector } from 'reselect'
import { isTruthy } from 'utils/types'

export const selectCategories = (state) => state.categorization.categories

export const makeSelectCategoriesFetching = () => createSelector(
  selectCategories,
  (state) => state.fetching
)

export const makeSelectCategories = () => createSelector(
  selectCategories,
  (state) => {
    const slugs = state.slugs
    if (!isTruthy(slugs)) {
      return []
    }

    const bySlug = state.bySlug
    return slugs.map((slug) => bySlug[slug])
  }
)

export const makeSelectCategoryBySlug = () => createSelector(
  (state, props) => selectCategories(state).bySlug[props.slug],
  (category) => category
)
