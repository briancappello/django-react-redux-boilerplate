import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'utils'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import Blog from 'components/Blog'

import {
  fetchPostsByCategoryIfNeeded,
  setPostsByCategoryCurrentCategorySlug,
} from './actions'
import { makeSelectPostsByCategoryCurrentCategory } from './selectors'

import { fetchCategoriesIfNeeded } from 'containers/Categorization/actions'
import { makeSelectCategories } from 'containers/Categorization/selectors'

export class CategoryPosts extends React.Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      posts: PropTypes.array,
    })),
    currentCategory: PropTypes.shape({
      name: PropTypes.string,
      posts: PropTypes.array,
    }),
    fetchCategoriesIfNeeded: PropTypes.func,
    fetchPostsByCategoryIfNeeded: PropTypes.func,
    setPostsByCategoryCurrentCategorySlug: PropTypes.func,
  }

  static mapStateToProps = createStructuredSelector({
    categories: makeSelectCategories(),
    currentCategory: makeSelectPostsByCategoryCurrentCategory(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      fetchCategoriesIfNeeded,
      fetchPostsByCategoryIfNeeded,
      setPostsByCategoryCurrentCategorySlug,
    }, dispatch),
  })

  componentWillMount() {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillUpdate(nextProps) {
    this.fetchDataIfNeeded(nextProps)
  }

  fetchDataIfNeeded(props) {
    const { routeParams: { slug } } = props
    this.props.setPostsByCategoryCurrentCategorySlug(slug)
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchPostsByCategoryIfNeeded(slug)
  }

  render() {
    const { categories, currentCategory } = this.props
    return (
      <div>
        <Helmet title={`Latest ${currentCategory.name} Category Posts`} />
        <Blog categories={categories} currentCategory={currentCategory} posts={currentCategory.posts} tags={currentCategory.tags} />
      </div>
    )
  }
}

export default connect(CategoryPosts)
