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
