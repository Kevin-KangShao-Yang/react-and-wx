import { Component } from 'react'
import axios from 'axios'
// 导入基准路径
import { BASEURL } from './url'

// 导入token相关的方法
import { getToken, removeToken } from './token'

// 设置基准路径
axios.defaults.baseURL = BASEURL

// 配置请求拦截器
axios.interceptors.request.use(
  function(config) {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.data.status === 400) {
      // token异常或者过期
      removeToken()
    }
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 配置响应拦截器

// 把axios挂载到组件的原型上
Component.prototype.http = axios

// 导出设置好基准路径之后的axios
export { axios }
