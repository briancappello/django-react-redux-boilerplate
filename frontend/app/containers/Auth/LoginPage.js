/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { preventDefault } from 'utils'

import { changeUsername, changePassword, login } from './actions'
import { selectLoading, selectError, selectForm } from './selectors';
import messages from './messages';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    form: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
  }

  render() {
    const { error, form } = this.props
    return (
      <div className="login-page">
        <Helmet title="Login" />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          <form onSubmit={this.props.onSubmit}>
            {error
              ? <div className="error">
                  <p>{error}</p>
                </div>
              : ''
            }
            <div>
              <label htmlFor="username">
                <FormattedMessage {...messages.usernameField} />
              </label>
              <input id="username"
                     type="text"
                     value={form.username}
                     onChange={this.props.onUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">
                <FormattedMessage {...messages.passwordField} />
              </label>
              <input id="password"
                     type="password"
                     value={form.password}
                     onChange={this.props.onPasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
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
