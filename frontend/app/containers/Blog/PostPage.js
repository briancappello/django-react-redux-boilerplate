import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'utils'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { fetchPostIfNeeded } from './actions'
import { makeSelectCurrentPost } from './selectors'

import { Post } from 'components/Post'

export class PostPage extends React.Component {

  static propTypes = {
    fetchPostIfNeeded: PropTypes.func,
    post: PropTypes.shape({
      title: PropTypes.string,
    }),
  }

  static mapStateToProps = createStructuredSelector({
    post: makeSelectCurrentPost(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ fetchPostIfNeeded }, dispatch),
  })

  componentWillMount() {
    this.fetchPostIfNeeded(this.props)
  }

  componentWillUpdate(nextProps) {
    this.fetchPostIfNeeded(nextProps)
  }

  fetchPostIfNeeded(props) {
    const { routeParams: { slug } } = props
    this.props.fetchPostIfNeeded(slug)
  }

  render() {
    const { post } = this.props
    if (!post) {
      return (
        <div>
          <h1>Loading... <LoadingIndicator /></h1>
        </div>
      )
    }

    return (
      <article>
        <Helmet title={post.title} />
        <Post post={post} />
      </article>
    )
  }
}

export default connect(PostPage)
