<template>
  <Teleport :to="teleportSelector">
    <div class="my-2 border-dashed border-secondary-300 rounded-md">
      <div class="flex flex-col sm:flex-row">
        <Input placeholder="昵称" v-model="data.nickname.value" :invalid="data.nickname.invalid">
          <template #left>
            <IRegularUser/>
          </template>
        </Input>
        <Input placeholder="邮箱(可选,保密)" v-model="data.email.value" :invalid="data.email.invalid">
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
      <Textarea :minRows="4" :placeholder="props.coid ? '内容' : '内容(点击头像可回复他人)'" v-model="data.content.value"
                :invalid="data.content.invalid"/>
      <div class="flex justify-end">
        <Button v-if="props.coid" :type="isCurrentDarkMode ? 'light' : 'danger'" @click="emits('cancel')">取消</Button>
        <Button :type="isCurrentDarkMode ? 'info' : 'secondary'" @click="sendComment" :disabled="isSending">
          <template #icon v-if="isSending">
            <IRegularSpinnerThird class="animate-spin"/>
          </template>
          发送
        </Button>
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
  aid: number,
  coid?: number
}>()

const isSending = ref(false)

const data = reactive({
  nickname: {
    value: '',
    rule: betweenLength(2, 32, {
      min: '昵称不能少于2个字',
      max: '昵称不能超过32字',
    }),
    invalid: false,
  },
  email: {
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
  (e: 'cancel'): void,
  (e: 'refresh'): void,
}>()

function sendComment() {
  validate(data, (valid, message) => {
    if (valid) {
      isSending.value = true
      commentApi.post({
        aid: props.aid,
        nickname: data.nickname.value,
        email: data.email.value === '' ? null : data.email.value,
        site: data.site.value,
        content: data.content.value,
        reply: props.coid ? props.coid : null,
      }).then((res) => {
        isSending.value = false
        if (res.success) {
          emits('refresh')
          data.content.value = ''
          toast.add({
            type: 'success',
            message: res.msg,
            duration: 5000,
          })
        } else {
          toast.add({
            type: 'danger',
            message: res.msg,
            duration: 5000,
          })
        }
      })
    } else {
      toast.add({
        type: 'danger',
        message,
        duration: 5000,
      })
    }
  })
}
</script>