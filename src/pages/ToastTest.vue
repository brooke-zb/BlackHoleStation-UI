<template>
  <div>
    <Button @click="addToast" type="success">add toast</Button>
    <Button @click="addToast2" type="warning">add toast</Button>
    <Button @click="addToast3" type="info">add toast</Button>
    <Button @click="clearToast" type="danger">clear toast</Button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ToastTest',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import Icon from '~icons/regular/alien.vue'
import { title } from '@/utils/global'

title.value = '通知测试页面'

const toast = useToast()

function addToast() {
  toast.add({
    config: {
      type: 'success',
      message: 'hello world',
      duration: 3000,
    },
  })
}

function addToast2() {
  toast.add({
    config: {
      type: 'warning',
      message: '超级长文本，长达1145字，非常长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
      duration: 3000,
    },
  })
}

function addToast3() {
  toast.add({
    config: {
      type: 'info',
      message: '带自定义图标的toast',
      duration: 3000,
      icon: Icon,
    },
  })
}

function clearToast() {
  toast.clear()
}

// TEST
onMounted(() => {
  toast.add({
    id: 1,
    config: {
      type: 'success',
      message: '成功修改账户信息',
    },
  })
  toast.add({
    id: 1,
    config: {
      type: 'info',
      message: '您有一条新消息',
    },
  })
  toast.add({
    id: 1,
    config: {
      type: 'danger',
      message: '我将以高达形态出击',
    },
  })
  toast.add({
    id: 1,
    config: {
      type: 'warning',
      message: '这是一段长文本，非常长长长长长长长长长长长长长长长',
    },
  })
})
</script>