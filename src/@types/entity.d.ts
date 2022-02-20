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
  background: string,

}

declare interface Light {
  pos: [number, number],
  color: string,
}

declare interface BackgroundHolder {
  element: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  light: [Light[], Light[]],
  mousePos: [number, number],
}