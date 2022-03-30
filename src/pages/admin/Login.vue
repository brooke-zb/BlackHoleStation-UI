<template>
  <div class="box-center flex flex-col items-center p-2">
    <div class="flex flex-col items-center rounded-md bg-light-50/80 dark:bg-dark-700/90
                w-80 mx-2 px-4 py-8 gap-4 backdrop-blur">
      <div class="text-xl text-light-400 dark:text-dark-300">{{ siteName }}</div>
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
      <div class="px-1.5 flex items-center w-full text-light-500 dark:text-dark-300">
        <input id="login-remember-me" type="checkbox" class="checkbox" v-model="data.rememberMe.value"/>
        <label for="login-remember-me" class="select-none">7天内免登录</label>
      </div>
      <div class="flex w-full">
        <Button class="block grow" :type="store.state.isDarkMode ? 'info' : 'secondary'" @click="login" :disabled="isLogging">
          <template #icon v-if="isLogging">
            <IRegularSpinnerThird class="animate-spin"/>
          </template>
          {{ isLogging ? '登录中' : '登录' }}
        </Button>
      </div>
    </div>
    <router-link to="/" class="link mt-2">返回主页</router-link>
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
import store from '@/utils/store'

const router = useRouter()
const toast = useToast()
store.state.title = '管理员登录'
const siteName = import.meta.env.BHS_SITE_NAME

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
  rememberMe: {
    value: false,
  },
})
const isLogging = ref(false)

function login() {
  validate(data, (valid, message) => {
    if (valid) {
      accountApi.login({
        username: data.username.value,
        password: data.password.value,
        rememberMe: data.rememberMe.value,
      }).then((resp) => {
        if (resp.success) {
          toast.add({
            type: 'success',
            message: resp.msg,
            duration: 5000,
          })
          store.getLoginUser()
          router.push('/admin')
        } else {
          toast.add({
            type: 'danger',
            message: resp.msg,
            duration: 5000,
          })
        }
      })
    } else {
      toast.add({
        type: 'danger',
        message: message,
        duration: 5000,
      })
    }
  })
}
</script>