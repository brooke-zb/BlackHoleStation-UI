import request from '@/utils/request'

export default {
  getByCoid(coid: string | number) {
    return request.get<BhsComment>(`/admin/comment/${ coid }`)
  },
  getList(page?: number, status: BhsCommentStatus = 'PUBLISHED') {
    return request.get<Page<BhsComment>>(`/admin/comment`, {
      params: {
        page,
        status,
      },
    })
  },
  delete(coid: string | number) {
    return request.delete<null>(`/admin/comment/${ coid }`)
  },
  update(comment: BhsComment | any) {
    return request.put<null>(`/admin/comment`, {
      data: comment,
    })
  },
  updateStatus(coid: string | number, status: BhsCommentStatus) {
    return request.patch<null>(`/admin/comment/${ coid }/status/${ status }`)
  },
}