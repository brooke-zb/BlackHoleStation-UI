import request from '@/utils/request'

const getByAid = (aid: string) => {
  return request.get(`/api/article/${aid}`, {
  })
}

export default {
  getByAid
}