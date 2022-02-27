/**
 * gallerybox 1.0.0beta
 * @author brooke_zb
 * @license MIT <https://opensource.org/licenses/MIT>
 */
import gsap from 'gsap'
import IMaximize from '@/icons/regular/maximize.svg?raw'
import ICircleQuestion from '@/icons/regular/circle-question.svg?raw'
import ICircleXmark from '@/icons/regular/circle-xmark.svg?raw'

let alreadyInitEventListener = false
let overlay: HTMLDivElement

let direction: undefined | 'vertical' | 'horizontal'
let isShow = false

// mouse/finger vars
let startPos = [0, 0]
let zoomStartPos = new Array<Touch>(2)
let lastTranslate = [0, 0]
let translateDistance = [0, 0]
let dragging = false
let lastClickTick = 0
let dbclick = false

// zoom vars
let defaultRatios = 1
let maxRatios = 1.5
let zoom = false
let zoomRatios = 1
let zoomStartRatios = 1
let scaling = false

// debouce function
let debouceClick: Function

export default {
  init: (selector: string) => {
    // init vars
    isShow = false
    direction = undefined

    startPos = [0, 0]
    lastTranslate = [0, 0]
    translateDistance = [0, 0]
    dragging = false
    lastClickTick = 0
    dbclick = false

    defaultRatios = 1
    zoom = false
    zoomRatios = 1
    zoomStartRatios = 1
    scaling = false

    // create div to show images
    overlay = document.createElement('div')
    overlay.id = 'gallerybox_overlay'
    overlay.classList.add('fixed', 'left-0', 'top-0', 'w-screen', 'h-screen', 'bg-black', 'z-50', 'flex', 'justify-center', 'items-center', 'select-none', 'hidden')
    gsap.set(overlay, {
      '--tw-bg-opacity': 0,
    })

    // tips alert
    let tips = document.createElement('div')
    tips.innerHTML = `${ IMaximize.replace('svg xmlns', 'svg class="h-5 w-5" xmlns') }&nbsp;鼠标滑轮/手指双击<br>${ ICircleXmark.replace('svg xmlns', 'svg class="h-5 w-5" xmlns') }&nbsp;单击/垂直拖动`
    tips.classList.add('fixed', 'left-0', 'right-0', 'top-0', 'bottom-0', 'm-auto', 'z-50', 'bg-black', 'bg-opacity-60', 'dark:bg-opacity-60', 'px-4', 'py-2.5', 'h-16', 'w-48', 'text-white', 'rounded-md', 'hidden')
    gsap.set(tips, {
      opacity: 0,
    })
    overlay.appendChild(tips)

    // help button
    let closeBtn = document.createElement('div')
    closeBtn.setAttribute('title', '使用帮助')
    closeBtn.innerHTML = ICircleQuestion.replace('svg xmlns', 'svg class="h-5 w-5" xmlns')
    closeBtn.classList.add('fixed', 'right-1', 'top-1', 'text-white', 'bg-black', 'bg-opacity-60', 'dark:bg-opacity-80', 'rounded-full', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'z-50')
    closeBtn.addEventListener('mousedown', eve => {
      eve.stopPropagation()
    })
    closeBtn.addEventListener('mouseup', eve => {
      if (!dragging) {
        eve.stopPropagation()
        showTips(tips)
      }
    })
    closeBtn.addEventListener('touchstart', eve => {
      eve.stopPropagation()
    })
    closeBtn.addEventListener('touchend', eve => {
      if (!dragging) {
        eve.stopPropagation()
        showTips(tips)
      }
    })
    overlay.appendChild(closeBtn)

    // init debouce function
    debouceClick = debounce(() => {
      if (!dbclick) {
        // 按点击处理
        hideGallery(overlay)
      } else {
        dbclick = false
      }
    }, 300)

    if (!alreadyInitEventListener) {
      alreadyInitEventListener = true

      // PC event
      addEventListener('mousedown', eve => {
        if (isShow) {
          eve.preventDefault()

          // only enable on left mousebutton
          if (eve.button === 0) {
            dragging = true
            startPos[0] = eve.clientX
            startPos[1] = eve.clientY
          }
        }
      })
      addEventListener('mouseup', eve => {
        if (isShow) {
          eve.preventDefault()

          // only enable on left mousebutton
          if (eve.button === 0) {
            dragging = false

            if (zoom) {
              endTranslateEvent(lastTranslate[0], lastTranslate[1])
            } else {
              endPressEvent(lastTranslate[0], lastTranslate[1])
            }
          }
        }
      })
      addEventListener('mousemove', eve => {
        if (isShow && dragging) {
          lastTranslate[0] = eve.clientX - startPos[0]
          lastTranslate[1] = eve.clientY - startPos[1]

          if (zoom) {
            translateEvent(lastTranslate[0], lastTranslate[1])
          } else {
            moveEvent(lastTranslate[0], lastTranslate[1])
          }
        }
      })

      // mobile event
      addEventListener('touchstart', eve => {
        if (isShow) {
          eve.preventDefault()
          let tick = Date.now()

          if (eve.touches.length >= 2) {
            zoomStartPos[0] = eve.touches[0]
            zoomStartPos[1] = eve.touches[1]
            zoomStartRatios = gsap.getProperty(overlay.lastChild, 'scale') as number
            scaling = true
          } else {
            // double click
            if (tick - lastClickTick < 300) {
              dbclick = true
              if (zoom) {
                // shrink image
                gsap.to(overlay.lastChild, {
                  duration: 0.2,
                  scale: 1,
                  translateX: 0,
                  translateY: 0,
                })
                zoom = false
              } else {
                // enlarge image
                gsap.to(overlay.lastChild, {
                  duration: 0.2,
                  scale: (overlay.lastChild as HTMLImageElement).naturalWidth / (overlay.lastChild as HTMLImageElement).width > 1 ? (overlay.lastChild as HTMLImageElement).naturalWidth / (overlay.lastChild as HTMLImageElement).width : maxRatios,
                  translateX: 0,
                  translateY: 0,
                })
                zoom = true
              }
            }
            // single click
            else {
              // record finger start pos
              startPos[0] = eve.touches[0].clientX
              startPos[1] = eve.touches[0].clientY
            }
          }
          lastClickTick = tick
        }
      }, { passive: false })
      addEventListener('touchend', eve => {
        if (isShow) {
          // debug()
          eve.preventDefault()
          if (eve.touches.length < 2) {
            if (eve.touches.length === 0) {
              if (dragging) {
                dragging = false
                if (!scaling) {
                  // 按偏移处理
                  if (zoom) {
                    endTranslateEvent(lastTranslate[0], lastTranslate[1])
                  } else {
                    endPressEvent(lastTranslate[0], lastTranslate[1])
                  }
                } else {
                  scaling = false
                }
              } else {
                debouceClick()
              }
            }
            // 非双指处理
            if (zoom) {
              if (zoomRatios > maxRatios) {
                // 锁定最大缩放比
                gsap.to(overlay.lastChild, {
                  duration: 0.2,
                  scale: maxRatios,
                })
              }
            } else if (zoomRatios < 1) {
              // 锁定最小缩放比
              gsap.to(overlay.lastChild, {
                duration: 0.2,
                scale: 1,
              })
            }
          }
        }
      }, { passive: false })
      addEventListener('touchmove', eve => {
        if (isShow) {
          eve.preventDefault()
          dragging = true

          if (scaling) {
            if (eve.touches.length >= 2) {
              // 计算缩放比
              let tmpZoomRatios = getDistance(eve.touches[0], eve.touches[1]) / getDistance(zoomStartPos[0], zoomStartPos[1]) * zoomStartRatios
              zoomRatios = tmpZoomRatios

              // 放大图片
              if (tmpZoomRatios > 1) {
                zoom = true
                gsap.set(overlay.lastChild, {
                  scale: tmpZoomRatios,
                })
              }
              // 缩小图片
              else {
                zoom = false
                gsap.to(overlay.lastChild, {
                  duration: 0.2,
                  scale: 0.95,
                  translateX: 0,
                  translateY: 0,
                })
              }
            }
          } else {
            if (dbclick) {
              // TODO 放大后拖动
              if (zoom) {
                translateEvent(lastTranslate[0], lastTranslate[1])
              } else {
                moveEvent(lastTranslate[0], lastTranslate[1])
              }
            } else {
              // TODO 拖放返回
              lastTranslate[0] = eve.touches[0].clientX - startPos[0]
              lastTranslate[1] = eve.touches[0].clientY - startPos[1]
              if (zoom) {
                translateEvent(lastTranslate[0], lastTranslate[1])
              } else {
                moveEvent(lastTranslate[0], lastTranslate[1])
              }
            }
          }
        }
      }, { passive: false })
    }

    overlay.addEventListener('wheel', eve => {
      if (isShow) {
        eve.preventDefault()
        zoomRatios -= eve.deltaY * zoomRatios * 0.001
        let maxScale = img.naturalWidth / img.width * 2

        if (zoomRatios > 1 && zoomRatios <= maxScale) {
          zoom = true
          gsap.to(img, {
            duration: 0.2,
            scale: zoomRatios,
          })
        } else if (zoomRatios > maxScale) {
          zoom = true
          gsap.to(img, {
            duration: 0.2,
            scale: zoomRatios,
            onComplete: () => {
              zoomRatios = maxScale
              gsap.to(img, {
                duration: 0.2,
                scale: maxScale,
              })
            },
          })
        } else {
          zoom = false
          gsap.to(img, {
            duration: 0.2,
            scale: zoomRatios,
            onComplete: () => {
              zoomRatios = 1
              translateDistance[0] = 0
              translateDistance[1] = 0
              gsap.to(img, {
                duration: 0.2,
                translateX: 0,
                translateY: 0,
                scale: 1,
              })
            },
          })
        }
      }
    })

    // event handle
    function moveEvent(varX: number, varY: number) {
      if (!direction) {
        if (Math.abs(varX) + Math.abs(varY) > 20) {
          if (Math.abs(varX) - Math.abs(varY) > 0) {
            direction = 'horizontal'
          } else {
            direction = 'vertical'
          }
        }
      } else {
        switch (direction) {
          case 'horizontal':
          case 'vertical':
            gsap.set(overlay.lastChild, {
              translateX: varX,
              translateY: varY,
              scale: (window.innerHeight - Math.abs(varY)) / window.innerHeight,
            })
            break
        }
      }
    }

    function translateEvent(varX: number, varY: number) {
      if (Math.abs(varX) + Math.abs(varY) > 20) {
        if (Math.abs(varX) - Math.abs(varY) > 0) {
          direction = 'horizontal'
        } else {
          direction = 'vertical'
        }
      }
      gsap.set(overlay.lastChild, {
        translateX: translateDistance[0] + varX,
        translateY: translateDistance[1] + varY,
      })
    }

    function endPressEvent(varX: number, varY: number) {
      if (direction) {
        switch (direction) {
          case 'horizontal':
          case 'vertical':
            // not disappear
            if (Math.abs(varY) < window.innerHeight / 10) {
              gsap.to(overlay.lastChild, {
                duration: 0.2,
                scale: 1,
                translateX: 0,
                translateY: 0,
              })
            }
            // disappear
            else {
              hideGallery(overlay)
            }
            break
        }
      } else {
        hideGallery(overlay)
      }
      direction = undefined
    }

    function endTranslateEvent(varX: number, varY: number) {
      if (direction) {
        gsap.set(overlay.lastChild, {
          translateX: translateDistance[0] + varX,
          translateY: translateDistance[1] + varY,
        })
        translateDistance[0] += varX
        translateDistance[1] += varY
      } else {
        zoom = false
        zoomRatios = 1
        hideGallery(overlay)
      }
      direction = undefined
    }

    document.body.appendChild(overlay)

    // img element in div
    let img = document.createElement('img')
    img.id = 'gallerybox_img'
    img.classList.add('cursor-grab', 'max-h-screen', 'max-w-screen')
    img.addEventListener('mousedown', e => {
      e.preventDefault()
    })
    overlay.appendChild(img)

    initAllImagesWithSelector(selector, overlay, img)
  },
  refresh: (selector: string) => {
    let overlay = document.getElementById('gallerybox_overlay') as HTMLElement
    let img = document.getElementById('gallerybox_img') as HTMLImageElement

    initAllImagesWithSelector(selector, overlay, img)
  },
}

function initAllImagesWithSelector(selector: string, overlay: Element, img: HTMLImageElement) {
  let imgs = document.querySelectorAll(selector)
  imgs.forEach(e => {
    e.addEventListener('click', eve => {
      isShow = true

      let pos = e.getBoundingClientRect()
      eve.preventDefault()

      // reset scale translate
      translateDistance[0] = 0
      translateDistance[1] = 0

      let target = e.lastChild as HTMLImageElement
      // prevent when image load failed
      // scale will divide by zero
      if (target.naturalHeight == 0 || target.naturalWidth == 0) return
      img.src = target.src

      let scaleHeight = pos.height / Math.min(target.naturalHeight, window.innerHeight)
      let scaleWidth = pos.width / Math.min(target.naturalWidth, window.innerWidth)
      defaultRatios = Math.max(scaleHeight, scaleWidth)

      gsap.set(img, {
        scale: defaultRatios,
        translateX: -window.innerWidth / 2 + (pos.left + pos.width / 2),
        translateY: -window.innerHeight / 2 + (pos.top + pos.height / 2),
      })
      overlay.classList.remove('hidden')
      gsap.to(overlay, {
        duration: 0.2,
        '--tw-bg-opacity': 0.7,
      })
      gsap.to(img, {
        duration: 0.3,
        scale: 1,
        translateX: 0,
        translateY: 0,
      })
      maxRatios = img.naturalWidth / img.width * 1.5
    })
  })
}

function hideGallery(overlay: Element) {
  zoom = false
  gsap.to(overlay, {
    duration: 0.2,
    '--tw-bg-opacity': 0,
  })
  gsap.to(overlay.lastChild, {
    duration: 0.2,
    scale: 0.2,
    translateX: 0,
    translateY: 0,
    onComplete: () => {
      overlay.classList.add('hidden')
      isShow = false
    },
  })
}

function showTips(tips: Element) {
  tips.classList.remove('hidden')
  gsap.to(tips, {
    duration: 0.2,
    opacity: 1,
    overwrite: true,
    onComplete: () => {
      gsap.to(tips, {
        duration: 0.2,
        delay: 1.5,
        opacity: 0,
        overwrite: true,
        onComplete: () => {
          tips.classList.add('hidden')
        },
      })
    },
  })
}

function getDistance(pos1: Touch, pos2: Touch) {
  return Math.hypot(pos2.clientX - pos1.clientX, pos2.clientY - pos1.clientY)
}

