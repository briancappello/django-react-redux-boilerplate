import { createSelector } from 'reselect';

export const selectCategories = (state) => state.getIn(['categorization', 'categories'])

export const makeSelectCategoriesFetching = () => createSelector(
  selectCategories,
  (state) => state.get('fetching')
)

export const makeSelectCategories = () => createSelector(
  selectCategories,
  (state) => {
    const ids = state.get('ids')
    if (!ids || !ids.length) {
      return []
    }

    const byId = state.get('byId')
    return ids.map((id) => byId[id])
  }
)

export const makeSelectCategoriesBySlug = () => createSelector(
  selectCategories,
  (state) => {
    const slugIds = state.get('slugIds')
    const byId = state.get('byId')
    const bySlug = {}
    Object.keys(slugIds).forEach((slug) => {
      bySlug[slug] = byId[slugIds[slug]]
    })
    return bySlug
  }
)
