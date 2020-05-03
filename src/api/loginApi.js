import request from '../utils/request'

export function login (params) {
  return request({
    url: '/movies.json',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}