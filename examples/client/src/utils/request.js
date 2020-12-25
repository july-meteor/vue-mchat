import axios from 'axios'
import qs from 'qs'

/**
 *  对axios的
 */

// create an axios instance
const request = axios.create({

  timeout: 5000,
  // 跨域请求，允许保存cookie
  withCredentials: true
})

/**
 * 请求拦截器
 * 1、处理数据格式序列化问题 ， get 路径携带 ,  post 采用 formData , put  为json
 * 2、针对spring  security 和多租户 提供 tenantId 及  Authorization 参数
 * 3、针对   spring  security token  及 oauth/token   see  {@link api/login.js}
 */
request.interceptors.request.use(
  config => {
    // 前置拦截
    const token =sessionStorage.getItem("token");
    // 添加head配置
    if (token) {
       config.headers['Authorization'] = 'Bearer ' + token// token
    }


    // 处理一些 数组序列化问题
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    } else if (config.method === 'post') {

    }

    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const status = Number(response.status) || 200
    const res = response.data
    if (status !== 200 || res.code === 1) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 表单序列化  将json 转成 key=value&
const serialize = data => {
  const list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

export default request
