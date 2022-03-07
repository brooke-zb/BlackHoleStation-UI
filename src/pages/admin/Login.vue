<template>
  <div class="box-center flex justify-center">
    <div class="flex flex-col items-center rounded-md bg-light-50/80 dark:bg-dark-700/90
                w-80 mx-2 px-4 py-8 gap-4 backdrop-blur">
      <div class="text-xl text-light-400 dark:text-dark-300">黑洞空间站</div>
      <Input v-model="data.username.value" placeholder="用户名" :invalid="data.username.invalid">
        <template #left>
          <IRegularUser/>
        </template>
      </Input>
      <Input type="password" v-model="data.password.value"
             placeholder="密码" :invalid="data.password.invalid">
        <template #left>
          <IRegularLock/>
        </template>
      </Input>
      <div class="flex w-full">
        <Button class="block grow" :type="state.isDarkMode ? 'info' : 'secondary'" @click="login">
          登录
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Login',
})
</script>

<script lang="ts" setup>
import Input from '@/components/ui/form/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import state from '@/utils/store'

const toast = useToast()
state.title = '管理员登录'

const data = reactive({
  username: {
    value: '',
    rule: notEmpty('用户名不能为空'),
    invalid: false,
  },
  password: {
    value: '',
    rule: notEmpty('密码不能为空'),
    invalid: false,
  },
})

function login() {
  validate(data, (valid, message) => {
    if (valid) {
      toast.add({
        type: 'success',
        message: '登录成功',
        duration: 5000
      })
    } else {
      toast.add({
        type: 'danger',
        message: message,
        duration: 5000
      })
    }
  })
}
</script>