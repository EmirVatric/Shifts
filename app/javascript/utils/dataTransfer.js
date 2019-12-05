export const get = (url) => {
  return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(response => {
      return response
    })
}

export const post = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(response => {
    return response
  })
}

export const put = (url, data) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(response => {
    return response
  })
}

export const del = (url, data = null) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data
    })
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(response => {
    return response
  })
}