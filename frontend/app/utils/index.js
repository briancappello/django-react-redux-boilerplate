import { connect as reduxConnect } from 'react-redux'

const defaultMapStateToProps = () => ({})
const defaultMapDispatchToProps = (dispatch) => ({ dispatch })

export const connect = (component, mergeProps, options) => {
  return reduxConnect(
    component.mapStateToProps || defaultMapStateToProps,
    component.mapDispatchToProps || defaultMapDispatchToProps,
    mergeProps,
    options
  )(component)
}

export const isArray = (variable) => {
  return Object.prototype.toString.call(variable) === '[object Array]'
}

export const isObject = (variable) => {
  return Object.prototype.toString.call(variable) === '[object Object]'
}
