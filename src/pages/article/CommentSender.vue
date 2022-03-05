<template>
  <Teleport :to="teleportSelector">
    <div class="my-2 border-dashed border-secondary-300 rounded-md">
      <div class="flex flex-col sm:flex-row">
        <Input placeholder="昵称" v-model="data.nickname.value" :invalid="data.nickname.invalid">
          <template #left>
            <IRegularUser/>
          </template>
        </Input>
        <Input placeholder="邮箱(可选,保密)" v-model="data.mail.value" :invalid="data.mail.invalid">
          <template #left>
            <IRegularEnvelope/>
          </template>
        </Input>
        <Input placeholder="网站(可选)" v-model="data.site.value">
          <template #left>
            <IRegularLink/>
          </template>
        </Input>
      </div>
      <Textarea :minRows="4" placeholder="内容" v-model="data.content.value" :invalid="data.content.invalid"/>
      <div class="flex justify-end">
        <Button v-if="props.coid" :type="isCurrentDarkMode ? 'light' : 'danger'" @click="emits('cancel')">取消</Button>
        <Button :type="isCurrentDarkMode ? 'info' : 'secondary'" @click="sendComment">发送</Button>
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

const toast = useToast()

const props = defineProps<{
  coid?: number
}>()

const data = reactive({
  nickname: {
    value: '',
    rule: betweenLength(2, 32, {
      min: '昵称不能少于2个字',
      max: '昵称不能超过32字',
    }),
    invalid: false,
  },
  mail: {
    value: '',
    rule: or(email('邮箱格式不正确'), isEmpty('')),
    invalid: false,
  },
  site: {
    value: '',
  },
  content: {
    value: '',
    rule: betweenLength(1, 1000, {
      min: '评论内容不能少于1个字',
      max: '评论内容不能超过1000字',
    }),
    invalid: false,
  },
})

const teleportSelector = computed(() => props.coid ? `#co${ props.coid } .comment-sender` : '#bhs-comment-sender')

const emits = defineEmits<{
  (e: 'cancel'): void
}>()

function sendComment() {
  validate(data, (valid, message) => {
    if (valid) {
      toast.add({
        type: 'success',
        message: '评论发送成功',
        duration: 3000,
      })
    } else {
      toast.add({
        type: 'danger',
        message,
        duration: 3000,
      })
    }
  })
}
</script>