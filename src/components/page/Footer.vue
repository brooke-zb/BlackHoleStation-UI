<template>
  <div class="absolute bottom-0 h-20 w-full bg-light-50/50 dark:bg-dark-900/50 flex justify-center">
    <div class="max-w-5xl grow flex">
      <div class="w-1/3 hidden sm:block p-2"></div>
      <div class="w-1/2 sm:w-1/3 text-left sm:text-center p-2">
        <div>© {{ startYear === currentYear ? currentYear : `${ startYear } - ${ currentYear }` }}
          by {{ ownerName }}
        </div>
        <div class="mt-2">
          <a class="link" href="https://beian.miit.gov.cn">
            <img alt="备案" class="inline align-text-bottom" :src="beianImg">{{ beianNumber }}
          </a>
        </div>
      </div>
      <div class="w-1/2 sm:w-1/3 text-right p-2">
        <div>
          Power by
          <a class="link" title="BlackHoleStation" href="https://github.com/brooke-zb/BlackHoleStation">BHS</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Footer',
})
</script>

<script lang="ts" setup>
import beianImg from '@/assets/img/beian.png?url'

const beianNumber = import.meta.env.BHS_BEIAN_NUMBER
const ownerName = import.meta.env.BHS_OWNER_NAME
const startYear = import.meta.env.BHS_START_YEAR
const currentYear = new Date().getFullYear().toString()
</script>