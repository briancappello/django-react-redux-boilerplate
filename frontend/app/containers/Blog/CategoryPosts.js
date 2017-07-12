import React, { PropTypes } from 'react'
import { connect } from 'utils'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'

import { PostPreview } from 'components/PostPreview'

import {
  setCurrentPostsCategorySlug,
  fetchPostsByCategoryIfNeeded,
} from 'containers/Blog/actions'

import { makeSelectCurrentPostsCategory } from './selectors'

export class CategoryPosts extends React.Component {

  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string,
      posts: PropTypes.array,
    }),
    fetchPostsByCategoryIfNeeded: PropTypes.func,
    setCurrentPostsCategorySlug: PropTypes.func,
  }

  static mapStateToProps = createStructuredSelector({
    category: makeSelectCurrentPostsCategory(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
      fetchPostsByCategoryIfNeeded,
      setCurrentPostsCategorySlug,
    }, dispatch),
  })

  componentWillMount() {
    this.fetchPostsByCategoryIfNeeded(this.props)
  }

  componentWillUpdate(nextProps) {
    this.fetchPostsByCategoryIfNeeded(nextProps)
  }

  fetchPostsByCategoryIfNeeded(props) {
    const { routeParams: { slug } } = props
    this.props.setCurrentPostsCategorySlug(slug)
    this.props.fetchPostsByCategoryIfNeeded(slug)
  }

  render() {
    const { category } = this.props
    const { posts } = category
    if (!posts) {
      return <div><h1>Loading...</h1></div>
    }

    return (
      <div>
        <h1>{category.name} Posts</h1>
        {posts.map((post) => <PostPreview post={post} key={post.slug} />)}
      </div>
    )
  }
}

export default connect(CategoryPosts)
