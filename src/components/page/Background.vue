<template>
  <canvas ref="bg" class="fixed z-[-99] top-0 left-0"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Background',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import darkImage from '@/assets/img/blackhole.png?url'
import lightImage from '@/assets/img/planet.png'
import { isCurrentDarkMode, isShowImage } from '@/utils/global'

const bg = ref()

const setting: BackgroundSetting = {
  parallax: [20, 80],
  bgColor: {
    dark: '#0F172A',
    light: '#FAFAFA',
  },
  scale: {
    x: 1,
    y: 1.3,
  },
  imageSize: 256,
}

const holder: BackgroundHolder = {
  element: bg.value,
  ctx: bg.value,
  light: [],
  mousePos: [0, 0],
  parallax: [0, 0],
  image: {
    dark: null,
    light: null,
  },
}

let mousemoveHandler = throttle(e => {
  holder.mousePos[0] = e.clientX
  holder.mousePos[1] = e.clientY
  computeTranslate()
}, 20)
addEventListener('mousemove', mousemoveHandler)

// 初始化
onMounted(() => {
  holder.element = bg.value
  holder.ctx = holder.element.getContext('2d', { alpha: false }) as CanvasRenderingContext2D
  initLight()
  initSize()
  initImage()
  gsap.ticker.add(render)
})

const initSize = throttle(() => {
  holder.element.height = window.innerHeight
  holder.element.width = window.innerWidth
}, 50)
addEventListener('resize', initSize)

function initLight() {
  let x = Math.random()
  holder.light.push({
    pos: [x / setting.scale.x, 0.2 / setting.scale.y],
    color: {
      dark: 'rgba(255,0,0,0.15)',
      light: 'rgba(184,108,255,0.15)',
    },
  })
  holder.light.push({
    pos: [(x + 0.5) % 1 / setting.scale.x, 0.5 / setting.scale.y],
    color: {
      dark: 'rgba(108,0,255,0.15)',
      light: 'rgba(110,122,255,0.15)',
    },
  })
  holder.light.push({
    pos: [(x + 0.2) % 1 / setting.scale.x, 0.8 / setting.scale.y],
    color: {
      dark: 'rgba(0,186,255,0.15)',
      light: 'rgba(114,255,234,0.15)',
    },
  })
}

function initImage() {
  // dark image
  let darkCanvas = document.createElement('canvas')
  darkCanvas.width = setting.imageSize
  darkCanvas.height = setting.imageSize
  let darkCtx = darkCanvas.getContext('2d') as CanvasRenderingContext2D
  let darkImg = new Image()
  darkImg.onload = () => {
    darkCtx.drawImage(darkImg, 0, 0, setting.imageSize, setting.imageSize)
    holder.image.dark = darkCanvas
  }
  darkImg.src = darkImage

  // light image
  let lightCanvas = document.createElement('canvas')
  lightCanvas.width = setting.imageSize
  lightCanvas.height = setting.imageSize
  let lightCtx = lightCanvas.getContext('2d') as CanvasRenderingContext2D
  let lightImg = new Image()
  lightImg.onload = () => {
    lightCtx.drawImage(lightImg, 0, 0, setting.imageSize, setting.imageSize)
    holder.image.light = lightCanvas
  }
  lightImg.src = lightImage
}

// 渲染
function render() {
  holder.ctx.save()
  let bgColor = isCurrentDarkMode.value ? setting.bgColor.dark : setting.bgColor.light

  // background
  holder.ctx.fillStyle = bgColor
  holder.ctx.fillRect(0, 0, holder.element.width, holder.element.height)

  // light
  holder.ctx.scale(setting.scale.x, setting.scale.y)
  holder.light.forEach((light) => {
    holder.ctx.beginPath()
    let radius = Math.round((holder.element.height + holder.element.width) / 2)
    let x = holder.element.width * light.pos[0] < radius ? holder.element.width * light.pos[0] : radius
    let y = holder.element.height * light.pos[1] < radius ? holder.element.height * light.pos[1] : radius
    let grd = holder.ctx.createRadialGradient(x, y, 50, x, y, radius)
    grd.addColorStop(0, isCurrentDarkMode.value ? light.color['dark'] : light.color['light'])
    grd.addColorStop(1, `${ bgColor }01`)
    holder.ctx.fillStyle = grd
    holder.ctx.fillRect(
        x - radius,
        y - radius,
        radius * 2,
        radius * 2,
    )
  })
  holder.ctx.restore()

  // image
  let img = isCurrentDarkMode.value ? holder.image.dark : holder.image.light
  if (isShowImage.value && img) {
    holder.ctx.drawImage(
        img,
        holder.element.width / 2 - setting.imageSize / 2 + holder.parallax[0],
        holder.element.height / 2 - setting.imageSize / 2 + holder.parallax[1],
        setting.imageSize,
        setting.imageSize,
    )
  }
}

// 计算视差值
function computeTranslate() {
  gsap.to(holder.parallax, {
    duration: 0.4,
    endArray: [(1 - (holder.mousePos[0] / window.innerWidth)) * -setting.parallax[0], (1 - (holder.mousePos[1] / window.innerHeight)) * -setting.parallax[0]],
    ease: 'none',
  })
}
</script>