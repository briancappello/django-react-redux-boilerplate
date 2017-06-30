import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { selectToken } from 'containers/Auth/selectors'
import { logout } from 'containers/Auth/actions'
import { preventDefault } from 'utils'

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    token: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    const { token } = this.props
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        { token
          ? <Link href="/logout" onClick={this.props.onLogout}>Logout</Link>
          : <Link to="/login">Login</Link>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
})

function mapDispatchToProps(dispatch) {
  return {
    onLogout: (e) => {
      preventDefault(e)
      dispatch(logout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
