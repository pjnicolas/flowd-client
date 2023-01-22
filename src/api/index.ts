// TODO: Move URL http://localhost:3001 to .env

export const apiGet = (path: string, data: { [key: string]: any } = {}) => {
  const queryString = Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')

  return fetch(`http://localhost:3001/${path}?${queryString}`, {
    method: 'GET',
  }).then((response) => response.json().then((value) => response.ok ? value : Promise.reject(value)))
}

export const apiPost = (path: string, data?: any) => {
  return fetch(`http://localhost:3001/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json().then((value) => response.ok ? value : Promise.reject(value)))
}

export const apiPut = (path: string, data?: any) => {
  return fetch(`http://localhost:3001/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json().then((value) => response.ok ? value : Promise.reject(value)))
}

export const apiDelete = (path: string, data?: any) => {
  return fetch(`http://localhost:3001/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json().then((value) => response.ok ? value : Promise.reject(value)))
}

export const apiPatch = (path: string, data?: any) => {
  return fetch(`http://localhost:3001/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json().then((value) => response.ok ? value : Promise.reject(value)))
}

export const api = {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  patch: apiPatch,
}
