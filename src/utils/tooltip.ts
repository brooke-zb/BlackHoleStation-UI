import { App } from 'vue'

let nextTooltipId = 0

export const _tooltipImpl = {
  add: (tooltip: TooltipProps) => {},
  remove: (id: number) => {},
}

const tooltip = {
  install(app: App) {
    app.directive('tooltip', {
      mounted(el: Element, binding) {
        const tooltip = {
          id: nextTooltipId++,
          el,
          content: binding.value,
        }
        el.addEventListener('pointerenter', () => {
          _tooltipImpl.add(tooltip)
        })
        el.addEventListener('pointerleave', () => {
          _tooltipImpl.remove(tooltip.id)
        })
        el.addEventListener('blur', () => {
          _tooltipImpl.remove(tooltip.id)
        })
      },
    })
  },
}

export default tooltip