import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { formatDate, isSameDay } from 'utils'

import Highlight from 'react-highlight/lib/optimized'
import { HIGHLIGHT_LANGUAGES } from 'config'
import 'highlight.js/styles/tomorrow-night-eighties.css'

import './post.scss'

export class Post extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      publishDate: PropTypes.date,
      lastUpdated: PropTypes.date,
      html: PropTypes.string,
      next: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
      }),
      prev: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }

  render() {
    const {
      title,
      publishDate,
      lastUpdated,
      html,
      prev,
      next,
    } = this.props.post

    return (
      <div className="post">
        <h1>{title}</h1>
        <div className="dates">
          <span className="publish-date">Posted {formatDate(publishDate)}</span>
          {!isSameDay(publishDate, lastUpdated) &&
            <span className="last-updated"> - Updated {formatDate(lastUpdated)}</span>
          }
        </div>
        <Highlight innerHTML languages={HIGHLIGHT_LANGUAGES}>
          {html}
        </Highlight>
        <hr />
        {prev &&
          <Link className="prev" to={`/posts/${prev.slug}`}>
            Previous: {prev.title}
          </Link>
        }
        {next &&
          <Link className="next" to={`/posts/${next.slug}`}>
            Next: {next.title}
          </Link>
        }
      </div>
    )
  }
}
