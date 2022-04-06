import request from '@/utils/request'

export default {
  getByAid(aid: string | number) {
    return request.get<BhsArticle>(`/admin/article/${ aid }`)
  },
  getList(page?: number) {
    return request.get<Page<BhsArticle>>(`/admin/article`, {
      params: {
        page: page ? page : 1,
      },
    })
  },
}