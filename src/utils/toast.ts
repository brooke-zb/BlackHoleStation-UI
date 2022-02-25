export const _toastImpl = {
  add: (message: ToastProps) => {},
  remove: (id: number) => {},
  clear: () => {},
}

export const useToast = () => {
  return {
    add: (message: ToastProps) => {
      if (message.icon) {
        message.icon = shallowRef(message.icon)
      }
      _toastImpl.add(message)
    },
    remove: (id: number) => {
      _toastImpl.remove(id)
    },
    clear: () => {
      _toastImpl.clear()
    },
  }
}