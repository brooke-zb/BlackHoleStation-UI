declare type BhsRole = {
  rid: number,
  name: string,
  permissions: string[],
}

declare type BhsUser = {
  uid: number,
  role: BhsRole,
  name: string,
  mail: string,
  avatar: string | undefined,
  link: string | null,
  enabled: boolean,
}

declare type BhsComment = {
  coid: number,
  aid: number,
  uid: number | null,
  nickname: string,
  email: string | null,
  avatar: string | null,
  site: string | null,
  ip: string | null,
  content: string,
  created: string,
  parent: number | null,
  status: 'PUBLISHED' | 'PENDING' | 'INVISIBLE'
  reply: number | null,
  replyname: string | null,
  children: BhsComment[],
}

declare type BhsCategory = {
  cid: number,
  name: string,
  parent: number,
  children: BhsCategory[] | undefined,
}

declare type BhsTag = {
  tid: number,
  name: string,
  heat: number | undefined,
}

declare type BhsArticle = {
  aid: number,
  user: BhsUser,
  category: BhsCategory,
  tags: BhsTag[],
  title: string,
  description: string | null,
  picture: string | null,
  content: string,
  commentabled: boolean,
  appreciatabled: boolean,
  created: string,
  modified: string,
  status: 'PUBLISHED' | 'DRAFT' | 'INVISIBLE',
  views: number,
}

declare type BhsResponse<D> = {
  success: true,
  data: D,
  msg: string,
} | {
  success: false,
  data: null,
  msg: string,
}

declare type Page<D> = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startRow: number,
  endRow: number,
  list: D[],
  pageNum: number, // 当前页
  pageSize: number, // 每页数量
  pages: number, // 总页数
  total: number, // 总数量
}

// api props
declare type BhsCommentProps = {
  aid: number,
  nickname: string,
  content: string,
  email: string | null,
  site: string | null,
  reply: number | null,
}

declare type BhsLoginProps = {
  username: string,
  password: string,
  rememberMe: boolean,
}