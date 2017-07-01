import React, { PropTypes } from 'react'
import { change, reset } from 'redux-form'
import { reduxForm } from 'redux-form/immutable'
import { Alert, Button } from 'react-bootstrap'
import Icon from 'react-fontawesome'

import LoadingIndicator from 'components/LoadingIndicator'
import { TextFieldGroup, PasswordFieldGroup } from 'components/Form/Input'
import { login } from './actions'

const LoginForm = (props) => {
  const { error, handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit(login)}>
      { error &&
        <Alert bsStyle="danger">
          <Icon name="exclamation-triangle" /> <strong>{error}</strong>
        </Alert>
      }
      <TextFieldGroup name="username" />
      <PasswordFieldGroup name="password" />
      <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>
        {submitting ? <LoadingIndicator color="white" /> : ''} Submit
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
}

export default reduxForm({
  form: 'login',
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset('login'))
  },
  onSubmitFail: (errors, dispatch) => {
    dispatch(change('login', 'username', ''))
    dispatch(change('login', 'password', ''))
  },
})(LoginForm)
