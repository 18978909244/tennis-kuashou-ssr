<template>
  <div class="">
    <TopMenu />
    <div class="screen mx-auto py-8">
      <div>
        <nuxt-link to="/">
          <span class="cursor-pointer hover:text-blue-500">{{
            getName('site_name')
          }}</span></nuxt-link
        >
        >
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="screen mx-auto bg-white p-24 rounded-lg">
      <div class="flex flex-col justify-center items-center py-4 border-b">
        <img :src="detail.image" :alt="title" class="w-64 my-2" />

        <h1 class="text-center text-2xl font-bold my-4">
          {{ title }}
        </h1>
        <div class="flex justify-around w-full">
          <div
            :class="
              currentTabIndex === index
                ? 'text-red-500 border-red-500'
                : 'border-white'
            "
            v-for="(item, index) in tabList"
            :key="index"
            @click="switchTab(index)"
            class="py-4 border-b-2 cursor-pointer font-bold text-lg"
          >
            {{ item }}
          </div>
        </div>
        <div v-if="currentTab === '介绍'" class="p-4 text-base">
          <div
            v-if="detail.price"
            class="text-center mt-4 text-red-500 font-bold text-3xl"
          >
            参考价:{{ detail.price * 7 }}
          </div>
          <img
            :src="detail.material_image"
            v-if="detail.material_image"
            :alt="title + ' 材料图片'"
            class="w-14 mx-auto mt-4"
          />
          <div class="mt-4">英文简介：{{ detail.desc.replace(/\�/g, '') }}</div>
          <div v-if="chinese" class="mt-4">中文简介：{{ chinese }}</div>
        </div>
        <div v-if="currentTab === '评测'" class="p-4 text-sm w-full">
          <div class="flex flex-wrap w-full">
            <div
              v-for="(item, index) in detailAttributeList"
              :key="index"
              class="w-1/4 "
            >
              <div class="my-2 flex flex-col justify-center items-center">
                <div class="text-4xl font-bold text-red-500 my-1">
                  {{ item.value }}
                </div>
                <div class="text-xl">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto lg:px-12">
        <div class="mt-16 ">
          <!-- <ArticleList :list="list" /> -->
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import moment from 'dayjs'

import { reviewList, attributeList, stringAttributeList } from '@/utils/data'
// import ArticleList from '@/components/ArticleList'
import TopMenu from '@/components/TopMenu'
import Footer from '@/components/Footer'
export default {
  components: {
    // ArticleList,
    TopMenu,
    Footer
  },
  data() {
    return {
      submitLoading: false,
      form: {
        name: '',
        mobile: '',
        type: [],
        price: '',
        desc: ''
      },
      imgIndex: 0,
      imageHeight: 500,
      reviewList,
      attributeList,
      stringAttributeList,
      currentTabIndex: 0,
      tabList: ['介绍', '评测']
    }
  },
  computed: {
    ...mapState(['setting']),
    ...mapGetters(['getName', 'getList']),
    currentTab: function() {
      return this.tabList[this.currentTabIndex]
    },
    detailAttributeList: function() {
      return this.detail
        ? Object.entries(this.detail)
            .filter(([key, value]) => {
              return this.stringAttributeList.some(att => att.key === key)
            })
            .map(([key, value]) => {
              return {
                name: this.stringAttributeList.find(att => att.key === key)
                  .name,
                value
              }
            })
        : []
    }
  },
  async asyncData(context) {
    const {
      params: { id }
    } = context

    const detail = await context.$axios.$post('string/findOne', {
      where: {
        id
      }
    })

    const chinese = await context.$axios.$post('common/translate', {
      content: detail.desc
    })
    const title = `${detail.name} 网球线`
    return {
      detail,
      chinese,
      title,
      keywords: title,
      description: chinese || detail.desc
    }
  },
  head() {
    const meta = []
    if (this.description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.description
      })
    }
    if (this.keywords) {
      meta.push({
        hid: 'keywords',
        name: 'keywords',
        content: this.keywords
      })
    }
    return {
      title: this.title,
      meta
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {},

    switchTab(index) {
      this.currentTabIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.screen {
  max-width: 1280px;
}
</style>
