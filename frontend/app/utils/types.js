import Immutable from 'immutable'

// immutable < v4 doesn't export isImmutable, so we need this hack :(
// https://github.com/facebook/immutable-js/issues/1165
export const isImmutable = (variable) => {
  return Immutable.Iterable.isIterable(variable) && Object.prototype.hasOwnProperty.call(variable, 'size')
}

export const isArray = (variable) => {
  return Object.prototype.toString.call(variable) === '[object Array]'
}

export const isObject = (variable) => {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

export const isTruthy = (variable) => {
  if (!variable) {
    return false
  }

  if (isImmutable(variable)) {
    return !!variable.size
  }

  if (isArray(variable)) {
    return !!variable.length
  }

  if (isObject(variable)) {
    return !!Object.keys(variable).length
  }

  return true
}
