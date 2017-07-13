import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from 'react-fontawesome'

export default class Categories extends React.Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })),
    currentCategory: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  }

  static defaultProps = {
    currentCategory: null,
  }

  render() {
    const { categories, currentCategory } = this.props
    return (
      <div className="categories">
        {currentCategory && currentCategory.name
          ? <Link to="/">All</Link>
          : <span><Icon name="chevron-right" /> All</span>
        }
        {categories.map((category) =>
          <div className="category" key={category.slug}>
            {currentCategory && currentCategory.name === category.name
              ? <span><Icon name="chevron-right" /> {category.name}</span>
              : <Link to={`/posts/categories/${category.slug}`}>{category.name}</Link>
            }
          </div>
        )}
      </div>
    )
  }
}
