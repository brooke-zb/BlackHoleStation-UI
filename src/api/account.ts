import request from '@/utils/request'

const login = (data: BhsLoginProps) => {
  return request.post<null>('/account/token', {
    data
  })
}

const logout = () => {
  return request.delete<null>('/account/token')
}

export default {
  login,
  logout
}