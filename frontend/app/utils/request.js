import 'whatwg-fetch';
import * as Cookies from 'js-cookie'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  // early return if no content
  if (response.status === 204) {
    return null
  }

  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

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
    .then(checkStatus)
    .then(parseJSON);
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
