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
import { emailValidator, or, isEmptyValidator, getLengthRangeValidator, validate } from '@/utils/validation'

const toast = useToast()

const props = defineProps<{
  coid?: number
}>()

const data = reactive({
  nickname: {
    value: '',
    rule: getLengthRangeValidator(2, 32),
    invalid: false,
    message: '昵称长度需在2-32字之间',
  },
  mail: {
    value: '',
    rule: or(emailValidator, isEmptyValidator),
    invalid: false,
    message: '邮箱格式不正确',
  },
  site: {
    value: '',
  },
  content: {
    value: '',
    rule: getLengthRangeValidator(2, 1000),
    invalid: false,
    message: '内容长度需在2-1000字之间',
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