import request from '@/utils/request'

export default {
  getByName(name: string) {
    return request.get<Page<BhsArticle>>(`/tag/${name}`)
  },
  getList() {
    return request.get<BhsTag[]>('/tag')
  }
}