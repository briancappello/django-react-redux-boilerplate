import React, { PropTypes } from 'react'
import { connect } from 'utils'
import { Link } from 'react-router'
import { bindRoutineCreators } from 'redux-saga-routines'
import { createStructuredSelector } from 'reselect'
import { selectToken } from 'containers/Auth/selectors'
import { logout } from 'containers/Auth/actions'
import { BRAND } from 'config'

import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Icon from 'react-fontawesome'

export class Header extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    logout: PropTypes.func,
  }

  static mapStateToProps = createStructuredSelector({
    token: selectToken(),
  })

  static mapDispatchToProps = (dispatch) => ({
    ...bindRoutineCreators({ logout }, dispatch),
  })

  onLogout = (e) => {
    e.preventDefault()
    this.props.logout.trigger()
  }

  render() {
    const isAuthenticated = !!this.props.token
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
              <NavItem><Icon name="fighter-jet" /> Features</NavItem>
            </LinkContainer>
            { isAuthenticated
              ? <LinkContainer to="/logout" onClick={this.onLogout}>
                  <NavItem><Icon name="sign-out" /> Logout</NavItem>
                </LinkContainer>
              : <LinkContainer to="/login">
                  <NavItem><Icon name="sign-in" /> Login</NavItem>
                </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

// { pure: false } is necessary for navbar isActive class to update correctly
export default connect(Header, null, { pure: false })
