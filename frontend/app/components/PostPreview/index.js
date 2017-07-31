import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { formatDate } from 'utils/dates'

import './post-preview.scss'

export default class PostPreview extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      preview: PropTypes.string,
      publishDate: PropTypes.date,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
      tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }).isRequired,
  }

  render() {
    const { title, slug, preview, publishDate, category, tags } = this.props.post
    const hasCategory = !!category
    const hasTags = !!tags.length
    return (
      <div className="post-preview">
        <h2><Link to={`/posts/${slug}`}>{title}</Link></h2>
        <p className="publish-date">{formatDate(publishDate)}</p>
        {preview &&
          <p className="preview">
            {preview} <Link title={`Continue reading "${title}"`} className="read-more" to={`/posts/${slug}`}>»</Link>
          </p>
        }
        {(hasCategory || hasTags) &&
          <p className="categorization">
            {hasCategory && <span className="category">Category: {category.name}</span>}
            {hasCategory && hasTags ? <br /> : ''}
            {hasTags && <span className="tags">Tags: {tags.map((tag) => tag.name).join(', ')}</span>}
          </p>
        }
      </div>
    )
  }
}
