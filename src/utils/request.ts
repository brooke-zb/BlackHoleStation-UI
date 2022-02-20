import Cookies from 'js-cookie'
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.BHS_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 设置用户token
    let token = Cookies.get('Authorization')
    if (token && config.headers) {
      config.headers.Authorization = token
    }

    return config
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export default instance