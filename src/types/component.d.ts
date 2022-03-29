// background
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

// paginator
declare interface PageInfo {
  pages: number[],
  currentPage: number,
  hasPrevious: boolean,
  hasNext: boolean,
  hasPreviousMore: boolean,
  hasNextMore: boolean,
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

// tooltip
declare type TooltipProps = {
  id: number,
  el: Element,
  content: string,
}

// sidemenu
declare type NavItem = {
  label: string,
  icon: any,
  to: string,
  names: Array<string | symbol>
}