<template>
  <div class="bg-white sticky top-0 shadow-2xl z-50">
    <div
      class="container m-auto flex items-center justify-between text-gray-700 h-24 text-xl font-bold px-4"
    >
      <div class="flex items-center text-base">
        <nuxt-link to="/">
          <div class="w-40 mx-4 cursor-pointer">
            <img :src="getName('logo_img')" /></div
        ></nuxt-link>
        <!-- <div
          @click="$router.push('/')"
          class="hover:text-red-500 mx-4 cursor-pointer"
        >
          {{ getName('nav_home') }}
        </div> -->
        <!-- <div
          v-if="!getName('is_dev')"
          class="hover:text-red-500 mx-4 cursor-pointer"
        >
          {{ getName('nav_list') }}
        </div> -->
      </div>
      <div v-if="!getName('is_dev')" class="text-base">
        <a href="#demand">
          <div
            class="hover:bg-red-700 bg-red-500 rounded-lg text-white px-6 py-2 font-normal cursor-pointer"
          >
            我有需求
          </div>
        </a>
      </div>
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
    return {}
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
