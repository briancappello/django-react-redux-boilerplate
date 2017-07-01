import 'whatwg-fetch';
import * as Cookies from 'js-cookie'

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
    .then(_checkStatusAndParseJSON)
}

export function get(url, options = {}) {
  const _options = Object.assign({}, {
    headers: {
      'Accept': 'application/json',
    },
    method: 'GET',
  }, options)
  return request(url, _options)
}

export function post(url, data, options = {}) {
  const _options = Object.assign({}, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    method: 'POST',
    body: JSON.stringify(data),
  }, options)
  return request(url, _options)
}

export function authedGet(token, url, options = {}) {
  const _options = Object.assign({}, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
    },
    method: 'GET',
  }, options)
  return request(url, _options)
}

export function authedPost(token, url, data = null, options = {}) {
  const _options = Object.assign({}, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    method: 'POST',
    body: JSON.stringify(data),
  }, options)
  return request(url, _options)
}

export default request

// private functions -----------------------------------------------------------

function _checkStatusAndParseJSON(response) {
  return new Promise((resolve, reject) => {
    response.json()
      // response with json body
      .then((json) => {
        if (_checkStatus(response)) {
          // success response with json body
          resolve(json)
        } else {
          // error response with json error message
          reject(_responseError(response, json))
        }
      })
      // response with no body (response.json() raises SyntaxError)
      .catch(() => {
        if (_checkStatus(response)) {
          // success response with no body (most likely HTTP 204: No Content)
          resolve(null)
        } else {
          // error response, create generic error message from HTTP status
          reject(_responseError(response, { error: response.statusText }))
        }
      })
  })
}

function _checkStatus(response) {
  return response.status >= 200 && response.status < 300
}

function _responseError(response, json) {
  const error = new Error(response.statusText)
  error.response = json
  return error
}
