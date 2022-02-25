<template>
  <div class="h-[1145px]">
    <div>
      <router-link to="/btn">
        <Button>click me to btn</Button>
      </router-link>

      <router-link to="/articles/1">
        <Button type="secondary">click me to article</Button>
      </router-link>
    </div>

    <div>
      <Button @click="addToast" type="success">add toast</Button>
      <Button @click="clearToast" type="danger">clear toast</Button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { title } from '@/utils/global'
import { useToast } from '@/utils/toast'

title.value = '主页'

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

function clearToast() {
  toast.clear()
}
</script>