import request from '@/utils/request'

const getByAid = (aid: string | number) => {
  return request.get<BhsArticle>(`/article/${aid}`)
}

export default {
  getByAid
}