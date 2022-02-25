export const _toastImpl = {
  add: (message: ToastMessage) => {},
  remove: (id: number) => {},
  clear: () => {},
}

export const useToast = () => {
  return {
    add: (message: ToastMessage) => {
      if (message.config.icon) {
        message.config.icon = shallowRef(message.config.icon)
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