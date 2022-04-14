import request from '@/utils/request'

export default {
  insert(category: BhsCategory | any) {
    return request.post<null>('/admin/category', {
      data: category,
    })
  },
  update(category: BhsCategory | any) {
    return request.put<null>('/admin/category', {
      data: category,
    })
  },
  delete(cid: number) {
    return request.delete<null>(`/admin/category/${ cid }`)
  },
}