import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { selectToken } from 'containers/Auth/selectors'
import { logout } from 'containers/Auth/actions'
import { preventDefault } from 'utils'

import messages from './messages';

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    token: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    const { token } = this.props
    return (
      <div>
        <Link to="/">
          <FormattedMessage {...messages.home} />
        </Link>
        <Link to="/features">
          <FormattedMessage {...messages.features} />
        </Link>
        { token
          ? <Link href="/logout" onClick={this.props.onLogout}>
              <FormattedMessage {...messages.logout} />
            </Link>
          : <Link to="/login">
              <FormattedMessage {...messages.login} />
            </Link>
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
