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

  if (isArray(variable)) {
    return !!variable.length
  }

  if (isObject(variable)) {
    return !!Object.keys(variable).length
  }

  return true
}
