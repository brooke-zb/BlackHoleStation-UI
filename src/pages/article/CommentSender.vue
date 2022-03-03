<template>
  <Teleport :to="teleportSelector">
    <div class="my-2 border-2 border-dashed border-secondary-300 rounded-md">
      <div class="flex">
        <IRegularUser/>
        <input/>
        <IRegularEnvelope/>
        <input/>
        <IRegularLink/>
        <input/>
      </div>
      <div>
        <input/>
      </div>
      <div class="flex justify-end">
        <Button v-if="props.coid" :type="isCurrentDarkMode ? 'light' : 'danger'">取消</Button>
        <Button :type="isCurrentDarkMode ? 'info' : 'secondary'">发送</Button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CommentSender',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { isCurrentDarkMode } from '@/utils/global'

const props = defineProps<{
  coid?: number
}>()

const teleportSelector = computed(() => props.coid ? `#co${ props.coid } .comment-sender` : '#bhs-comment-sender')
</script>