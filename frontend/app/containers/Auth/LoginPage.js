/*
 * LoginPage
 */
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'utils'

import { Row, Col } from 'react-bootstrap'

import LoginForm from './LoginForm'
import { login } from './actions'

class LoginPage extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  static mapDispatchToProps = (dispatch) => ({
    onSubmit: ({ username, password }) => dispatch(login(username, password)),
  })

  render() {
    return (
      <Row>
        <Helmet title="Login" />
        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
          <h1>Login</h1>
          <LoginForm onSubmit={this.props.onSubmit} />
        </Col>
      </Row>
    )
  }
}

export default connect(LoginPage)
