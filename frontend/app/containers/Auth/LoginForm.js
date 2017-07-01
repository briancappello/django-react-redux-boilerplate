import React, { PropTypes } from 'react'
import { reset } from 'redux-form'
import { reduxForm } from 'redux-form/immutable'
import { Button } from 'react-bootstrap'

import LoadingIndicator from 'components/LoadingIndicator'
import { TextFieldGroup, PasswordFieldGroup } from 'components/Form/Input'

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <TextFieldGroup name="username" />
      <PasswordFieldGroup name="password" />
      <Button type="submit" bsStyle="primary" disabled={pristine || submitting}>
        {submitting ? <LoadingIndicator color="white" /> : ''} Submit
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'login',
  onSubmitSuccess: (result, dispatch) => dispatch(reset('login')),
  onSubmitFail: (errors, dispatch) => dispatch(reset('login')),
})(LoginForm)
