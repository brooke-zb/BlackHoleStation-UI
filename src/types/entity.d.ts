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
  nickname: string,
  email: string | null,
  avatar: string | null,
  site: string | null,
  ip: string | null,
  content: string,
  created: string,
  parent: number,
  status: 'PUBLISHED' | 'PENDING' | 'INVISIBLE'
  reply: number,
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

declare type BhsPageInfo<D> = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startRow: number,
  endRow: number,
  list: D[],
  pageNum: number,
  pageSize: number,
  total: number,
}

// type definitions of background
declare interface BackgroundSetting {
  parallax: [number, number],
  bgColor: {
    dark: string,
    light: string,
  }
  scale: {
    x: number,
    y: number,
  },
  imageSize: number,
}

declare interface Light {
  pos: [number, number],
  color: {
    dark: string,
    light: string,
  }
}

declare interface BackgroundHolder {
  element: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  light: Light[],
  mousePos: [number, number],
  parallax: [number, number],
  image: {
    dark: HTMLCanvasElement | null,
    light: HTMLCanvasElement | null,
  },
}

// menu
declare interface MenuItemProps {
  type: 'link' | 'action',
  to?: string,
  onClick?: () => void,
  icon?: any,
  text?: string,
  highlight?: any,
}

// toast
declare interface ToastMessage {
  id?: number,
  config: ToastProps,
}

declare interface ToastProps {
  type: 'info' | 'success' | 'danger' | 'warning',
  message: string,
  icon?: any,
  duration?: number,
}

// paginator
declare interface PageInfo {
  pages: number[],
  currentPage: number,
  hasPrevious: boolean,
  hasNext: boolean,
  hasPreviousMore: boolean,
  hasNextMore: boolean,
}