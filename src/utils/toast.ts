export const _toastImpl = {
  add: (message: ToastMessage) => {},
  remove: (id: number) => {},
  clear: () => {},
}

export const useToast = () => {
  return {
    add: (message: ToastMessage) => {
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