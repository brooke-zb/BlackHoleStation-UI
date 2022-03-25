import request from '@/utils/request'

export default {
  getByAid(aid: string | number) {
    return request.get<BhsArticle>(`/article/${ aid }`)
  },
  getList(page?: number) {
    return request.get<Page<BhsArticle>>(`/article`, {
      params: {
        page: page ? page : 1,
      },
    })
  },
  getTimeline(page?: number) {
    return request.get<BhsArticle[]>(`/article/timeline`, {
      params: {
        page: page ? page : 1,
      },
    })
  },
  getListByUserId(uid: string | number, page?: number) {
    return request.get<Page<BhsArticle>>(`/article/user/${ uid }`, {
      params: {
        page: page ? page : 1,
      },
    })
  },
  getListByCategoryId(cid: string | number, page?: number) {
    return request.get<Page<BhsArticle>>(`/article/category/${ cid }`, {
      params: {
        page: page ? page : 1,
      },
    })
  },
  getListByTag(tag: string, page?: number) {
    return request.get<Page<BhsArticle>>(`/article/tag/${ tag }`, {
      params: {
        page,
      },
    })
  },
}