/*
 * HomePage
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'utils'

import { Row, Col } from 'react-bootstrap'
import { PostPreview } from 'components/PostPreview'
import Categories from 'containers/Categorization/Categories'

import { fetchPostsIfNeeded } from 'containers/Blog/actions'
import { makeSelectPosts } from 'containers/Blog/selectors'

export class HomePage extends React.Component {

  static propTypes = {
    fetchPostsIfNeeded: PropTypes.func,
    posts: PropTypes.arrayOf(PropTypes.object),
  }

  static mapStateToProps = createStructuredSelector({
    posts: makeSelectPosts(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ fetchPostsIfNeeded }, dispatch),
  })

  componentWillMount() {
    this.props.fetchPostsIfNeeded()
  }

  componentWillUpdate() {
    this.props.fetchPostsIfNeeded()
  }

  render() {
    const { posts } = this.props
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <Row>
          <Col md={9} xs={12}>
            <h1>Latest Posts</h1>
            {posts.map((post) => <PostPreview post={post} key={post.slug} />)}
          </Col>
          <Col md={3} xs={12}>
            <h2>Categories</h2>
            <Categories />
          </Col>
        </Row>
      </article>
    )
  }
}

export default connect(HomePage)
