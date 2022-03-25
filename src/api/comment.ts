import request from '@/utils/request'

export default {
  getByAid(aid: string | number, page?: number) {
    return request.get<Page<BhsComment>>(`/comment`, {
      params: {
        aid,
        page: page || 1,
      },
    })
  },
  getByCoid(coid: string | number) {
    return request.get<BhsComment>(`/comment/${ coid }`)
  },
  post(data: BhsCommentProps) {
    return request.post<null>(`/comment`, {
      data,
    })
  },
}