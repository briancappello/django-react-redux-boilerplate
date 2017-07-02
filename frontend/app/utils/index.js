import { connect as reduxConnect } from 'react-redux'

const emptyObjectFn = () => ({})

export const connect = (component, mergeProps, options) => {
  return reduxConnect(
    component.mapStateToProps || emptyObjectFn,
    component.mapDispatchToProps || emptyObjectFn,
    mergeProps,
    options
  )(component)
}

export const isArray = (variable) => {
  return Object.prototype.toString.call(variable) === '[object Array]'
}
