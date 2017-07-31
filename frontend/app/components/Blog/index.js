import React, { PropTypes } from 'react'

import { Row, Col } from 'react-bootstrap'
import PostPreview from 'components/PostPreview'
import Categories from 'components/Categories'

export default class Blog extends React.Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })),
    currentCategory: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
    posts: PropTypes.arrayOf(PropTypes.shape({
      preview: PropTypes.string,
      publishDate: PropTypes.date,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    currentCategory: null,
  }

  render() {
    const { categories, currentCategory, posts } = this.props
    return (
      <Row>
        <Col md={9} xs={12}>
          <h1>
            {currentCategory && currentCategory.name
              ? `Latest ${currentCategory.name} Category Posts`
              : 'Latest Posts'
            }
          </h1>
          {posts.map((post) => <PostPreview post={post} key={post.slug} />)}
        </Col>
        <Col md={3} xs={12}>
          <h2>Categories</h2>
          <Categories categories={categories} currentCategory={currentCategory} />
        </Col>
      </Row>
    )
  }
}
