import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { Field } from 'redux-form'
import Icon from 'react-fontawesome'
import classNames from 'classnames'
import startCase from 'lodash/startCase'

import { isArray } from 'utils/types'
import { required as requiredValidator } from './validators'
import './form.scss'

/* eslint-disable react/prop-types */

export const TextField = (props) =>
  <Field type="text" component={_renderField} required={_isRequired(props)} {...props} />

export const PasswordField = (props) =>
  <Field type="password" component={_renderField} required={_isRequired(props)} {...props} />

export const EmailField = (props) =>
  <Field type="email" component={_renderField} required={_isRequired(props)} {...props} />

export default TextField

// private functions --------------------------------------------------

const _isRequired = ({ validate }) => {
  return isArray(validate) && validate.indexOf(requiredValidator) !== -1
}

const _renderField = ({ input, label, meta, required, ...props }) => {
  const { touched, error, warning } = meta
  const errorState = () => {
    if (touched && error) return 'error'
    if (touched && warning) return 'warning'
    return null
  }

  const { name } = input
  return (
    <FormGroup controlId={name} validationState={errorState()}>
      <ControlLabel className={classNames({ required })}>
        {label || startCase(name)}
      </ControlLabel>
      <FormControl {...input} {...props} />
      <FormControl.Feedback>
        {errorState() && <Icon name="exclamation-triangle" />}
      </FormControl.Feedback>
      {errorState() && <HelpBlock>{error || warning}</HelpBlock>}
    </FormGroup>
  )
}

/* eslint-enable */
