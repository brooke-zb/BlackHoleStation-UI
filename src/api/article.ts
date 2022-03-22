import request from '@/utils/request'

const getByAid = (aid: string | number) => {
  return request.get<BhsArticle>(`/article/${aid}`)
}

const getList = (page?: number) => {
  return request.get<Page<BhsArticle>>(`/article`, {
    params: {
      page: page ? page : 1
    }
  })
}

const getListByUserId = (uid: string | number, page?: number) => {
  return request.get<Page<BhsArticle>>(`/article/user/${uid}`, {
    params: {
      page: page ? page : 1
    }
  })
}

const getListByCategoryId = (cid: string | number, page?: number) => {
  return request.get<Page<BhsArticle>>(`/article/category/${cid}`, {
    params: {
      page: page ? page : 1
    }
  })
}

const getListByTag = (tag: string, page?: number) => {
  return request.get<Page<BhsArticle>>(`/article/tag/${tag}`, {
    params: {
      page
    }
  })
}

export default {
  getByAid,
  getList,
  getListByUserId,
  getListByCategoryId,
  getListByTag
}