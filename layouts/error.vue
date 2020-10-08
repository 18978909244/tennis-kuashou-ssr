<template>
  <div class="bg-red-700">
    <TopMenu />

    <div class="bg-red-900 text-white py-8">
      <div class="container m-auto">
        <div class="flex mb-4">
          <div @click="$router.push('/')" class="cursor-pointer">Home</div>
          <div class="mx-2">></div>
          <div>404</div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 py-16">
      <div class="container m-auto">
        <div class="flex justify-center items-center">
          <div class="text-gray-700 text-2xl">
            <div>Oops!</div>
            <div>We can't seem to find the page you're looking for.</div>
            <div>Error code: 404</div>
            <div>Here are some helpful links instead:</div>
            <div
              @click="$router.push('/')"
              class="text-4xl text-blue-500 cursor-pointer"
            >
              Home
            </div>
          </div>
          <!-- <div>11{{ image }}{{ title }}</div> -->
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Footer,
    TopMenu
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getName'])
  }
}
</script>
