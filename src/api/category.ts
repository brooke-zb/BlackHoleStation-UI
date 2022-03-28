import request from '@/utils/request'

export default {
  getByCid(cid: number) {
    return request.get<BhsCategory>(`/category/${cid}`)
  },
  getList() {
    return request.get<BhsCategory[]>('/category')
  }
}