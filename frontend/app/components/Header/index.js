import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { selectToken } from 'containers/Auth/selectors'
import { logout } from 'containers/Auth/actions'
import { preventDefault } from 'utils'
import { BRAND } from 'config'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Icon from 'react-fontawesome'

export class Header extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    const { token } = this.props
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Icon name="home" /> {BRAND}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/features">
              <NavItem>
            <Icon name="fighter-jet" /> Features</NavItem>
            </LinkContainer>
            { token
              ? <LinkContainer to="/logout" onClick={this.props.onLogout}>
                  <NavItem><Icon name="sign-out" /> Logout</NavItem>
                </LinkContainer>
              : <LinkContainer to="/login">
                  <NavItem><Icon name="sign-in" /> Login</NavItem>
                </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false } // necessary for navbar isActive class to update correctly
)(Header)
