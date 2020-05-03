/*
*   @options 是个对象
*   @return fetch
* */
import fetchDefaults from 'fetch-defaults'
import { obj2String } from './index'

const apiFetach = fetchDefaults(fetch, 'http://192.168.2.13:3000')

function request(options) {
  return new Promise((resolve, reject) => {
    if (options.method === 'get') { // get 方法
      options.url = `?${obj2String(options.params)}`
      apiFetach(options.url, {
        method: 'get',
        mode: 'cors', // no-cors (跨域模式但服务器不支持cors)， cors(跨域模式， 需要服务器通过Access-Control-Allow-Origin来允许指定的源进行跨域)
        cache: 'no-cache', // 跨域的相关配置
        credentials: 'same-origin', // 缓存的相关配置
        headers: options.headers || {
          'Content-Type': 'application/json'
        }
      })
    } else if (options.method === 'post') {
      apiFetach(options.url, {
        method: 'post',
        mode: 'cors', // no-cors (跨域模式但服务器不支持cors)， cors(跨域模式， 需要服务器通过Access-Control-Allow-Origin来允许指定的源进行跨域)
        cache: 'no-cache', // 跨域的相关配置
        credentials: 'same-origin', // 缓存的相关配置
        headers: options.headers || {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options.params)
      })
    }
  })
}

export default request