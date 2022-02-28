<template>
  <Teleport to="body">
    <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div v-show="isShow" ref="container"
           @wheel.stop.prevent="onWheel"
           class="fixed top-0 left-0 w-full h-full overflow-hidden
           bg-light-900 z-50 select-none flex flex-col justify-between">
        <!--提示栏-->
        <div class="flex justify-between z-50">
          <div class="px-3 text-xs text-light-200 flex justify-center items-center">
            {{ currentIndex }} / {{ pictures.length }}
          </div>
          <div @click="onClose"
               class="p-3 cursor-pointer fill-light-300 hover:fill-light-50 transition-colors">
            <ISolidXmark class="w-5 h-5"/>
          </div>
        </div>

        <!--图片-->
        <div ref="overlay" class="picture-container flex justify-center items-center"
             @mousedown.stop.prevent="onMouseDown" @mousemove.stop.prevent="onMouseMove"
             @mouseup.stop.prevent="onMouseUp" @touchstart.stop.prevent="onTouchStart"
             @touchmove.stop.prevent="onTouchMove" @touchend.stop.prevent="onTouchEnd">
          <img ref="image" :src="currentPicture" alt="" :class="classAppend"/>
        </div>

        <!--alt信息-->
        <div class="p-3 text-sm text-light-200 flex justify-center items-center
        bg-gradient-to-b from-transparent to-black/60 z-50">
          {{ currentAlt }}
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'GalleryContainer',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'

// 动画
const isShow = ref(false)
let InOutRatios = 1
let InOutTranslateX = 0
let InOutTranslateY = 0
let refImage = ref<HTMLImageElement>()

function onBeforeEnter(el: Element) {
  document.addEventListener('keyup', onNothing)
  document.addEventListener('keydown', onNothing)
  gsap.set(el, {
    '--tw-bg-opacity': 0,
  })
}

const canZoom = ref(false)
const isZooming = ref(false)
let currentZoomRatios = ref(1)
let maxZoomRatios = 1

function onEnter(el: Element, done: () => void) {
  resetData()
  gsap.set(image.value, {
    scale: InOutRatios,
    translateX: InOutTranslateX,
    translateY: InOutTranslateY,
    onComplete: () => {
      gsap.to(el, {
        '--tw-bg-opacity': 0.9,
        duration: 0.2,
        onComplete: done,
      })
      gsap.to(image.value, {
        scale: 1,
        translateX: 0,
        translateY: 0,
        duration: 0.2,
      })
    },
  })
}

function onLeave(el: Element, done: () => void) {
  resetData()
  document.removeEventListener('keyup', onNothing)
  document.removeEventListener('keydown', onNothing)
  gsap.to(image.value, {
    scale: InOutRatios,
    translateX: InOutTranslateX,
    translateY: InOutTranslateY,
    duration: 0.2,
  })
  gsap.to(el, {
    '--tw-bg-opacity': 0,
    duration: 0.2,
    onComplete: done,
  })
}

// init
const pictures = ref<HTMLImageElement[]>([])
const currentIndex = ref(0)
const currentPicture = ref('')
const currentAlt = ref('')
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      let img = entry.target as HTMLImageElement
      if (img.dataset.src) {
        img.src = img.dataset.src
      }
    }
  })
})

function init(selector: string) {
  // init container
  pictures.value = Array.from(document.querySelectorAll(selector))
  pictures.value.forEach((el, i) => {
    // init lazyload
    observer.observe(el)

    el.addEventListener('click', () => {
      currentIndex.value = i + 1
      currentPicture.value = el.src
      currentAlt.value = el.alt
      isShow.value = true
      refImage.value = el
    })
  })
}

function onClose() {
  isShow.value = false
  resetData()
}

function onWheel(e: WheelEvent) {
  currentZoomRatios.value -= e.deltaY * currentZoomRatios.value / 1000
  if (canZoom.value) {
    // 放大
    if (currentZoomRatios.value > 1 && currentZoomRatios.value <= maxZoomRatios) {
      isZooming.value = true
      gsap.to(image.value, {
        scale: currentZoomRatios.value,
        duration: 0.2,
      })
    }
    // 放大超过最大值
    else if (currentZoomRatios.value > maxZoomRatios) {
      isZooming.value = true
      gsap.to(image.value, {
        scale: currentZoomRatios.value,
        duration: 0.2,
        onComplete: () => {
          currentZoomRatios.value = maxZoomRatios
          gsap.to(image.value, {
            scale: maxZoomRatios,
            duration: 0.2,
          })
        },
      })
    }
    // 复原
    else {
      isZooming.value = false
      gsap.to(image.value, {
        scale: currentZoomRatios.value,
        duration: 0.2,
        onComplete: () => {
          currentZoomRatios.value = 1
          distance[0] = 0
          distance[1] = 0
          gsap.to(image.value, {
            scale: 1,
            translateX: 0,
            translateY: 0,
            duration: 0.2,
          })
        },
      })
    }
  } else {
    gsap.to(image.value, {
      scale: currentZoomRatios.value,
      duration: 0.2,
      onComplete: () => {
        currentZoomRatios.value = maxZoomRatios
        gsap.to(image.value, {
          scale: maxZoomRatios,
          duration: 0.2,
        })
      },
    })
  }
}

const isDragging = ref(false)
const startPos = [0, 0]
const distance = [0, 0]

function onMouseDown(e: MouseEvent) {
  if (e.button === 0) {
    isDragging.value = true
    startPos[0] = e.clientX
    startPos[1] = e.clientY
  }
}

function onMouseMove(e: MouseEvent) {
  if (isDragging.value) {
    // 缩放情况
    if (isZooming.value) {
      gsap.set(image.value, {
        translateX: distance[0] + e.clientX - startPos[0],
        translateY: distance[1] + e.clientY - startPos[1],
      })
    }
  }
}

function onMouseUp(e: MouseEvent) {
  if (e.button === 0) {
    isDragging.value = false
    // 非缩放情况
    if (!isZooming.value) {
      if ((e.target as Element)?.tagName === 'IMG') {
        if (canZoom.value) {
          isZooming.value = true
          gsap.to(image.value, {
            scale: maxZoomRatios,
            duration: 0.2,
          })
        }
      } else {
        onClose()
      }
    }
    // 缩放情况
    else {
      // 移动距离小，取消缩放
      if (Math.abs(e.clientX - startPos[0]) + Math.abs(e.clientY - startPos[1]) < 10) {
        isZooming.value = false
        distance[0] = 0
        distance[1] = 0
        gsap.to(image.value, {
          scale: 1,
          translateX: 0,
          translateY: 0,
          duration: 0.2,
        })
      }
      // 叠加移动距离
      else {
        distance[0] += e.clientX - startPos[0]
        distance[1] += e.clientY - startPos[1]
      }
    }
  }
}

let isPressing = false
let lastClientPos = [0, 0]

function onTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    isPressing = true
    startPos[0] = e.touches[0].clientX
    startPos[1] = e.touches[0].clientY
    lastClientPos[0] = e.touches[0].clientX
    lastClientPos[1] = e.touches[0].clientY
  }
}

function onTouchMove(e: TouchEvent) {
  if (isPressing) {
    lastClientPos[0] = e.touches[0].clientX
    lastClientPos[1] = e.touches[0].clientY

    gsap.set(image.value, {
      translateX: distance[0] + lastClientPos[0] - startPos[0],
      translateY: distance[1] + lastClientPos[1] - startPos[1],
    })
  }
}

function onTouchEnd(e: TouchEvent) {
  if (e.touches.length === 0) {
    isPressing = false
    // 非缩放情况
    if (!isZooming.value) {
      // 点击
      if (Math.abs(lastClientPos[0] - startPos[0]) + Math.abs(lastClientPos[1] - startPos[1]) < 10) {
        if ((e.target as Element)?.tagName === 'IMG') {
          if (canZoom.value) {
            isZooming.value = true
            gsap.to(image.value, {
              scale: maxZoomRatios,
              duration: 0.2,
            })
          }
        } else {
          onClose()
        }
      }
      // 拖动
      else if (Math.abs(lastClientPos[1] - startPos[1]) > 100) {
        onClose()
      } else {
        gsap.to(image.value, {
          scale: 1,
          translateX: 0,
          translateY: 0,
          duration: 0.2,
        })
      }
    }
    // 缩放情况
    else {
      // 点击，取消缩放
      if (Math.abs(lastClientPos[0] - startPos[0]) + Math.abs(lastClientPos[1] - startPos[1]) < 10) {
        isZooming.value = false
        distance[0] = 0
        distance[1] = 0
        gsap.to(image.value, {
          scale: 1,
          translateX: 0,
          translateY: 0,
          duration: 0.2,
        })
      }
      // 拖动，叠加移动距离
      else {
        distance[0] += lastClientPos[0] - startPos[0]
        distance[1] += lastClientPos[1] - startPos[1]
      }
    }
  }
}

// 杂项
function onNothing(e: Event) {
  e.preventDefault()
}

function resetData() {
  // in out data
  if (refImage.value) {
    let rect = refImage.value.getBoundingClientRect()

    let scaleHeight = rect.height / Math.min(refImage.value.naturalHeight, window.innerHeight)
    let scaleWidth = rect.width / Math.min(refImage.value.naturalWidth, window.innerWidth)
    InOutRatios = Math.max(scaleHeight, scaleWidth)

    InOutTranslateX = -document.documentElement.clientWidth / 2 + (rect.left + rect.width / 2)
    InOutTranslateY = -document.documentElement.clientHeight / 2 + (rect.top + rect.height / 2)
  }

  // zoom data
  isZooming.value = false
  maxZoomRatios = image.value.naturalWidth / image.value.width
  canZoom.value = maxZoomRatios > 1

  // distance data
  distance[0] = 0
  distance[1] = 0
}

// 图片灯箱功能
const image = ref()
const overlay = ref()

const classAppend = computed(() => ({
  'max-h-full max-w-full': true,
  'cursor-zoom-in': canZoom.value && !isZooming.value,
  'cursor-grab': !canZoom.value || isZooming.value,
  'cursor-grabbing': isDragging.value,
}))

defineExpose({
  init,
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<style scoped>
.picture-container {
  height: calc(100vh - 6.5rem);
}
</style>