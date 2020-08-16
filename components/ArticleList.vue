<template>
  <div class="flex flex-wrap">
    <div v-for="item in list" :key="item.id" class="lg:w-1/3 md:w-full">
      <nuxt-link :to="`/detail/${item.weixinid}`">
        <div
          class="transform hover:scale-105 flex-col m-4 cursor-pointer rounded-lg bg-white shadow-2xl"
        >
          <div class="flex justify-center border-b h-48">
            <img :src="item.cover_image" :alt="item.name" />
          </div>
          <div class="p-10">
            <div class="text-gray-700 font-bold text-lg py-2">
              {{ item.title }}
            </div>
            <div class="text-gray-500 pt-2">{{ item.digest }}</div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped></style>
