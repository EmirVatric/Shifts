import fetch from 'cross-fetch'

export const CHECK_LOGIN = 'CHECK_LOGIN'

export function receiveStatus(logged_in, name, id) {
  return {
    type: CHECK_LOGIN,
    loggedIn: logged_in,
    name,
    id
  }
}


export function loggedInStatus() {
  return function (dispatch) {
    return fetch(`/api/logged_in`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(response => {
        return dispatch(receiveStatus(response.logged_in, response.user.name, response.user.id))
      })
  }
}