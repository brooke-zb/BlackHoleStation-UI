import request from '@/utils/request'

const getByAid = (aid: string | number, page?: number) => {
  return request.get<Page<BhsComment>>(`/comment`, {
    params: {
      aid,
      page: page || 1
    }
  })
}

const getByCoid = (coid: string | number) => {
  return request.get<BhsComment>(`/comment/${coid}`)
}

const post = (data: BhsComment) => {
  return request.post<null>(`/comment`, {
    data
  })
}

export default {
  getByAid,
  getByCoid,
  post
}