import request from '@/utils/request'

export default {
  getList() {
    return request.get<BhsCategory[]>('/category')
  }
}