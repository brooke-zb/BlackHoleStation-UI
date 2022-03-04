<template>
  <Teleport :to="teleportSelector">
    <div class="my-2 border-dashed border-secondary-300 rounded-md">
      <div class="flex flex-col sm:flex-row">
        <Input placeholder="昵称">
          <template #left>
            <IRegularUser/>
          </template>
        </Input>
        <Input placeholder="邮箱(可选,保密)">
          <template #left>
            <IRegularEnvelope/>
          </template>
        </Input>
        <Input placeholder="网站(可选)">
          <template #left>
            <IRegularLink/>
          </template>
        </Input>
      </div>
      <Textarea :minRows="4"/>
      <div class="flex justify-end">
        <Button v-if="props.coid" :type="isCurrentDarkMode ? 'light' : 'danger'" @click="emits('cancel')">取消</Button>
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
import Input from '@/components/ui/form/Input.vue'
import Textarea from '@/components/ui/form/Textarea.vue'
import { isCurrentDarkMode } from '@/utils/global'

const props = defineProps<{
  coid?: number
}>()

const teleportSelector = computed(() => props.coid ? `#co${ props.coid } .comment-sender` : '#bhs-comment-sender')

const emits = defineEmits<{
  (e: 'cancel'): void
}>()
</script>