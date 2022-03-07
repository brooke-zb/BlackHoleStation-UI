import { App } from 'vue'

let nextTooltipId = 0

export const _tooltipImpl = {
  add: (tooltip: TooltipProps) => {},
  remove: (id: number) => {},
}

const tooltip = {
  install(app: App) {
    app.directive('tooltip', {
      mounted(el: Element, binding: any) {
        const tooltip = {
          id: nextTooltipId++,
          el,
          content: binding.value,
        }
        el.addEventListener('mouseenter', () => {
          _tooltipImpl.add(tooltip)
        })
        el.addEventListener('mouseleave', () => {
          _tooltipImpl.remove(tooltip.id)
        })
      },
    })
  },
}

export default tooltip