import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'utils'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import Blog from 'components/Blog'

import {
  fetchPostsByCategoryIfNeeded,
  setCurrentPostsCategorySlug,
} from './actions'
import { makeSelectCurrentPostsCategory } from './selectors'

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
    setCurrentPostsCategorySlug: PropTypes.func,
  }

  static mapStateToProps = createStructuredSelector({
    categories: makeSelectCategories(),
    currentCategory: makeSelectCurrentPostsCategory(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      fetchCategoriesIfNeeded,
      fetchPostsByCategoryIfNeeded,
      setCurrentPostsCategorySlug,
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
    this.props.setCurrentPostsCategorySlug(slug)
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchPostsByCategoryIfNeeded(slug)
  }

  render() {
    const { categories, currentCategory } = this.props
    return (
      <div>
        <Helmet title={`Latest ${currentCategory.name} Category Posts`} />
        <Blog categories={categories} currentCategory={currentCategory} posts={currentCategory.posts} />
      </div>
    )
  }
}

export default connect(CategoryPosts)
