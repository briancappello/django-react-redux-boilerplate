/*
 * HomePage
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'utils'

import Blog from 'components/Blog'

import { fetchCategoriesIfNeeded } from 'containers/Categorization/actions'
import { makeSelectCategories } from 'containers/Categorization/selectors'

import { fetchPostsIfNeeded } from 'containers/Blog/actions'
import { makeSelectPosts } from 'containers/Blog/selectors'

export class HomePage extends React.Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    fetchCategoriesIfNeeded: PropTypes.func,
    fetchPostsIfNeeded: PropTypes.func,
    posts: PropTypes.arrayOf(PropTypes.object),
  }

  static mapStateToProps = createStructuredSelector({
    categories: makeSelectCategories(),
    posts: makeSelectPosts(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      fetchCategoriesIfNeeded,
      fetchPostsIfNeeded,
    }, dispatch),
  })

  componentWillMount() {
    this.fetchDataIfNeeded()
  }

  componentWillUpdate() {
    this.fetchDataIfNeeded()
  }

  fetchDataIfNeeded() {
    this.props.fetchPostsIfNeeded()
    this.props.fetchCategoriesIfNeeded()
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <Blog categories={categories} posts={posts} />
      </div>
    )
  }
}

export default connect(HomePage)
