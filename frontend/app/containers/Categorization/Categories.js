import React, { PropTypes } from 'react'
import { connect } from 'utils'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { fetchCategoriesIfNeeded } from './actions'
import { makeSelectCategories } from './selectors'

export class Categories extends React.Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    fetchCategoriesIfNeeded: PropTypes.func,
  }

  static mapStateToProps = createStructuredSelector({
    categories: makeSelectCategories(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ fetchCategoriesIfNeeded }, dispatch),
  })

  componentWillMount() {
    this.props.fetchCategoriesIfNeeded()
  }

  render() {
    const { categories } = this.props
    return (
      <div className="categories">
        {categories.map((category) =>
          <div className="category" key={category.id}>
            <Link to={`/posts/categories/${category.slug}`}>{category.name}</Link>
          </div>
        )}
      </div>
    )
  }
}

export default connect(Categories)
