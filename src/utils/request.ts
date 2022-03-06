import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.BHS_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

const request = {
  get: <D>(url: string, config?: AxiosRequestConfig) => {
    return instance.get(url, config) as Promise<BhsResponse<D>>
  },
  post: <D>(url: string, config: AxiosRequestConfig) => {
    return instance.post(url, config.data, config) as Promise<BhsResponse<D>>
  },
  put: <D>(url: string, config: AxiosRequestConfig) => {
    return instance.put(url, config.data, config) as Promise<BhsResponse<D>>
  },
  patch: <D>(url: string, config: AxiosRequestConfig) => {
    return instance.patch(url, config.data, config) as Promise<BhsResponse<D>>
  },
  delete: <D>(url: string, config?: AxiosRequestConfig) => {
    return instance.delete(url, config) as Promise<BhsResponse<D>>
  },
}

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
    if (error.response) {
      return Promise.resolve(error.response.data)
    } else {
      return Promise.resolve({
        success: false,
        data: null,
        msg: '网络异常，请求失败',
      })
    }
  },
)

export default request