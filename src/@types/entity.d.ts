declare interface Role {
  rid: number,
  name: string,
  permission: string[]
}

declare interface User {
  uid: number,
  role: Role,
  name: string,
  link: string | null
}

declare interface Comment {
  coid: number,
  author: User,
  text: string,
  children: Comment[]
}

declare interface Category {
  cid: number,
  name: string
}

declare interface Article {
  aid: number,
  category: Category,
  tags: string[],
  title: string,
  subtitle: string | null,
  text: string,
  created: string,
  modified: string,
  visit: number,
  comments: Comment[]
}

declare interface AjaxError {
  response: boolean,
  status: number,
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