<template>
  <div class="bg-gray-800 h-48 relative px-4">
    <div v-show="qrShow" class="absolute right-0 bottom-0 hidden lg:block">
      <img :src="getName('footer_qr')" class="w-48" />
    </div>
    <div
      class="text-white h-full flex flex-col justify-center items-center py-4"
    >
      <div class="container m-auto flex justify-between items-center h-full">
        <nuxt-link :to="`/`">
          <div class="text-center">
            小网球 tennis.kuashou.com
          </div>
        </nuxt-link>
        <div class="mx-4 cursor-pointer">
          网站地图
        </div>
        <div
          @mousemove="qrShow = true"
          @mouseleave="qrShow = false"
          class="flex flex-col justify-center items-center"
        >
          <div class="iconfont icon-weixin text-5xl text-white"></div>
          <div>联系我</div>
        </div>
      </div>
      <!-- <div class="w-full text-center">
        <div @click="$router.push('/')">
          小网球 tennis.kuashou.com
        </div>
        <div
          @mousemove="qrShow = true"
          @mouseleave="qrShow = false"
          class="mt-4"
        >
          版权所有 @copyright
        </div>
        <div
          @mousemove="qrShow = true"
          @mouseleave="qrShow = false"
          class="text-xs cursor-pointer"
        >
          开发者 苏晓光 联系我
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    logo: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      qrShow: false
    }
  },
  computed: {
    ...mapGetters(['getName'])
  },
  methods: {}
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
