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
import blackhole from '@/assets/img/blackhole.png?url'
import { isCurrentDarkMode } from '@/utils/global'

const bg = ref()
const bgColor = {
  dark: '#0F172A',
  light: '#F0FDFA',
}

const setting: BackgroundSetting = {
  parallax: [20, 80],
  background: isCurrentDarkMode.value ? bgColor.dark : bgColor.light,
}

const holder: BackgroundHolder = {
  element: bg.value,
  ctx: bg.value,
  light: [[], []],
  mousePos: [0, 0],
}

// listener
watch(isCurrentDarkMode, (isDark) => {
  if (isDark) {
    setting.background = bgColor.dark
  } else {
    setting.background = bgColor.light
  }
})

addEventListener('resize', initSize)

// init
onMounted(() => {
  holder.element = bg.value
  holder.ctx = holder.element.getContext('2d', { alpha: false }) as CanvasRenderingContext2D
  initLight()
  initSize()
  gsap.ticker.add(render)
})

function initSize() {
  holder.element.height = window.innerHeight
  holder.element.width = window.innerWidth
}

function initLight() {
  for (let i = 0; i < 4; i++) {
    holder.light[0].push({
      pos: [Math.random(), Math.random()],
      color: 'rgba(255,41,41,0.15)',
    })
    holder.light[1].push({
      pos: [Math.random(), Math.random()],
      color: 'rgba(123,38,229,0.15)',
    })
  }
}

// render
function render() {
  // background
  holder.ctx.fillStyle = setting.background
  holder.ctx.fillRect(0, 0, holder.element.width, holder.element.height)

  // light
  holder.light.forEach((arr) => {
    arr.forEach((light) => {
      holder.ctx.beginPath()
      let grd = holder.ctx.createRadialGradient(
          light.pos[0] * holder.element.width,
          light.pos[1] * holder.element.height,
          0,
          light.pos[0] * holder.element.width,
          light.pos[1] * holder.element.height,
          300,
      )
      grd.addColorStop(0, light.color)
      grd.addColorStop(0.1, light.color)
      grd.addColorStop(1, `${setting.background}00`)
      holder.ctx.fillStyle = grd
      holder.ctx.fillRect(0, 0, holder.element.width, holder.element.height)
    })
  })
}
</script>