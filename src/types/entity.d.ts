declare type BhsRole = {
  rid: number,
  name: string,
  permission: string[]
}

declare type BhsUser = {
  uid: number,
  role: BhsRole,
  name: string,
  link: string | null
}

declare type BhsComment = {
  coid: number,
  author: BhsUser,
  text: string,
  children: BhsComment[]
}

declare type BhsCategory = {
  cid: number,
  name: string
}

declare type BhsTag = {
  tid: number,
  name: string
}

declare type BhsArticle = {
  aid: number,
  category: BhsCategory,
  tags: BhsTag[],
  title: string,
  description: string | null,
  content: string,
  created: string,
  modified: string,
  views: number,
  comments: BhsComment[]
}

declare type BhsResponse<D> = {
  success: true,
  data: D,
  msg: string
} | {
  success: false,
  data: null,
  msg: string
}

// type definitions of background
declare interface BackgroundSetting {
  parallax: [number, number],
  bgColor: {
    dark: string,
    light: string
  }
  scale: {
    x: number,
    y: number
  },
  imageSize: number
}

declare interface Light {
  pos: [number, number],
  color: {
    dark: string,
    light: string
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
    light: HTMLCanvasElement | null
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