import request from '@/utils/request'

export default {
  getByAid(aid: string | number) {
    return request.get<BhsArticle>(`/admin/article/${ aid }`)
  },
  getList(page?: number, status?: BhsArticleStatus, cid?: number, uid?: number) {
    return request.get<Page<BhsArticle>>(`/admin/article`, {
      params: {
        page: page ? page : 1,
        status,
        uid,
        cid,
      },
    })
  },
  delete(aid: string | number) {
    return request.delete<null>(`/admin/article/${ aid }`)
  },
  update(aid: string | number, article: BhsArticle) {
    return request.put<null>(`/admin/article/${ aid }`, {
      data: article,
    })
  },
  insert(article: BhsArticle) {
    return request.post<BhsArticle>(`/admin/article`, {
      data: article,
    })
  },
}