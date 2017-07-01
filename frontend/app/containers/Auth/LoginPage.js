/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Row, Col, Alert } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import LoginForm from './LoginForm'
import { login } from './actions'
import { selectError } from './selectors';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { error } = this.props

    return (
      <Row>
        <Helmet title="Login" />
        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
          <h1>Login</h1>
          { error
            ? <Alert bsStyle="danger">
                <Icon name="exclamation-triangle" /> <strong>{error}</strong>
              </Alert>
            : ''
          }
          <LoginForm onSubmit={this.props.onSubmit} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: ({ username, password }) => {
      dispatch(login(username, password))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
