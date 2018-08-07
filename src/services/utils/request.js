import Vue from 'vue'
import axios from 'axios'
import loading from '../../plugins/loading'
axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const API_ROOT = process.env.API_ROOT

function fetchData () {
  async function getResponse (url, params, type) {
    loading.start()
    let parameters = {}
    const api = `${API_ROOT}/${url}`
    if (type === 'GET') {
      parameters = {
        url: params ? `${api}?${translateParams(params)}` : `${api}`,
        method: 'get'
      }
    } else if (type === 'POST') {
      parameters = {
        url: `${api}`,
        method: 'post',
        data: translateParams(params)
      }
    }
    try {
      let result = await axios.request(parameters)
      loading.end()
      if (result.data.code === 1) {
        loading.end()
      } else {
        loading.error()
        Vue.prototype.$toast.show(result.data.msg || '请求服务器失败')
      }
      return result.data
    } catch (err) {
      loading.error()
      Vue.prototype.$toast.show(err.msg || err.message || '请求服务器失败')
      return {code: 44000, msg: '接口请求失败，请检查网络'}
    }
  }
  function translateParams (params) {
    let url = ''
    for (let param in params) {
      url += `${param}=${params[param]}&`
    }
    return url.substring(0, url.length - 1)
  }
  return {
    get (url, params) {
      return getResponse(url, params, 'GET')
    },
    post (url, params) {
      return getResponse(url, params, 'POST')
    }
  }
}

export default fetchData()

// export const getRequest = async (url, params) => {
//   let urlStr = `${API_ROOT}/${url}?${translateParams(params)}`
//   let parameters = {
//     url: urlStr,
//     method: 'get'
//   }
//   let data = await axios.request(parameters)
//   return data.data
// }
// export const postRequest = async (url, params) => {
//   let parameters = {
//     url: `${API_ROOT}/${url}`,
//     method: 'post',
//     data: translateParams(params)
//   }
//   let data = await axios.request(parameters)
//   return data.data
// }
// export function translateParams (params) {
//   let url = ''
//   for (let param in params) {
//     url += `${param}=${params[param]}&`
//   }
//   return url.substring(0, url.length - 1)
// }
