import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Field } from 'redux-form/immutable'

import startCase from 'lodash/startCase'

/* eslint-disable react/prop-types */
const BSInput = ({ input, meta, ...props }) => { // eslint-disable-line no-unused-vars
  return <FormControl value={input.value} onChange={input.onChange} {...props} />
}

export const TextField = (props) => {
  return <Field type="text" component={BSInput} {...props} />
}

export const TextFieldGroup = ({ name, label, placeholder }) => {
  return (
    <FormGroup controlId={name}>
      <ControlLabel>{label || startCase(name)}</ControlLabel>
      <TextField name={name} placeholder={placeholder} />
    </FormGroup>
  )
}

export const PasswordField = (props) => {
  return <Field type="password" component={BSInput} {...props} />
}

export const PasswordFieldGroup = ({ name, label, placeholder }) => {
  return (
    <FormGroup controlId={name}>
      <ControlLabel>{label || startCase(name)}</ControlLabel>
      <PasswordField name={name} placeholder={placeholder} />
    </FormGroup>
  )
}

export default TextField
/* eslint-enable */
