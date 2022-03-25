import request from '@/utils/request'

export default {
  login(data: BhsLoginProps) {
    return request.post<null>('/account/token', {
      data,
    })
  },
  logout() {
    return request.delete<null>('/account/token')
  },
  getInfo() {
    return request.get<BhsUser>('/account')
  },
}