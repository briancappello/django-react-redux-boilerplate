import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { formatDate } from 'utils/dates'

import './post-preview.scss'

export class PostPreview extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      preview: PropTypes.string,
      publishDate: PropTypes.date,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { title, slug, preview, publishDate } = this.props.post
    return (
      <div className="post-preview">
        <h2><Link to={`/posts/${slug}`}>{title}</Link></h2>
        <p className="publish-date">{formatDate(publishDate)}</p>
        {preview &&
          <p className="preview">
            {preview} <Link title={`Continue reading "${title}"`} className="read-more" to={`/posts/${slug}`}>»</Link>
          </p>
        }
      </div>
    )
  }
}

export default PostPreview
