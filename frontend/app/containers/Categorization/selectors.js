import { createSelector } from 'reselect';
import { isTruthy } from 'utils/types'

export const selectCategories = (state) => state.getIn(['categorization', 'categories'])

export const makeSelectCategoriesFetching = () => createSelector(
  selectCategories,
  (state) => state.get('fetching')
)

export const makeSelectCategories = () => createSelector(
  selectCategories,
  (state) => {
    const slugs = state.get('slugs')
    if (!isTruthy(slugs)) {
      return []
    }

    const bySlug = state.get('bySlug')
    return slugs.map((slug) => bySlug[slug])
  }
)

export const makeSelectCategoryBySlug = () => createSelector(
  (state, props) => selectCategories(state).get('bySlug')[props.slug],
  (category) => category
)
