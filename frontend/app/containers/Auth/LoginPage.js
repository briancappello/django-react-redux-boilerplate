/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { preventDefault } from 'utils'
import LoadingComponent from 'components/LoadingIndicator'
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import { changeUsername, changePassword, login } from './actions'
import { selectLoading, selectError, selectForm } from './selectors';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    form: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
  }

  render() {
    const { loading, error, form } = this.props

    return (
      <Row>
        <Helmet title="Login" />
        <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
          <h1>Login</h1>
          { loading ? <LoadingComponent /> :
            <form onSubmit={this.props.onSubmit}>
              {error
                ? <div className="error">
                    <p>{error}</p>
                  </div>
                : ''
              }
              <FormGroup>
                <ControlLabel htmlFor="username">Username:</ControlLabel>
                <FormControl id="username"
                             type="text"
                             value={form.username}
                             onChange={this.props.onUsernameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel htmlFor="password">Password:</ControlLabel>
                <FormControl id="password"
                             type="password"
                             value={form.password}
                             onChange={this.props.onPasswordChange}
                />
              </FormGroup>
              <Button type="submit" bsStyle="primary">
                <Icon name="sign-in" /> Submit
              </Button>
            </form>
          }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  form: selectForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (e) => {
      preventDefault(e)
      dispatch(login())
    },
    onUsernameChange: (e) => {
      preventDefault(e)
      dispatch(changeUsername(e.target.value))
    },
    onPasswordChange: (e) => {
      preventDefault(e)
      dispatch(changePassword(e.target.value))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
