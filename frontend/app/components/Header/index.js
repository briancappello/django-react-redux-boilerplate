import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectToken } from 'containers/Auth/selectors'
import { logout } from 'containers/Auth/actions'
import { preventDefault } from 'utils'

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
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
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          { token
            ? <HeaderLink href="/logout" onClick={this.props.onLogout}>
                <FormattedMessage {...messages.logout} />
              </HeaderLink>
            : <HeaderLink to="/login">
                <FormattedMessage {...messages.login} />
              </HeaderLink>
          }
        </NavBar>
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
