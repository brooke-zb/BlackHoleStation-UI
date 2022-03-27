import request from '@/utils/request'

export default {
  getList() {
    return request.get<BhsFriend>('/friend')
  },
}