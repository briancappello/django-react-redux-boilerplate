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
      <div className="login-page">
        <Helmet title="Login" />
        <h1>Login</h1>
        { loading ? <LoadingComponent /> :
          <form onSubmit={this.props.onSubmit}>
            {error
              ? <div className="error">
                  <p>{error}</p>
                </div>
              : ''
            }
            <div>
              <label htmlFor="username">Username:</label>
              <input id="username"
                     type="text"
                     value={form.username}
                     onChange={this.props.onUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password"
                     type="password"
                     value={form.password}
                     onChange={this.props.onPasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        }
      </div>
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
