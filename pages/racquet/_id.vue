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
        <div class="flex">
          <img
            :src="detail.racquet_detail.image_list[imgIndex]"
            :alt="title"
            class="w-64 my-2"
          />
          <div class="flex flex-col ml-8">
            <img
              :src="img"
              :alt="title"
              v-for="(img, idx) in detail.racquet_detail.image_list.slice(0, 4)"
              :key="idx"
              @click="imgIndex = idx"
              :class="imgIndex === idx ? 'border-red-500' : ''"
              class="w-16 my-2 cursor-pointer border-2 border-white"
            />
          </div>
        </div>

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
          <div>
            英文简介：{{ detail.racquet_detail.desc.replace(/\�/g, '') }}
          </div>
          <div v-if="chinese" class="mt-4">中文简介：{{ chinese }}</div>
        </div>
        <div v-if="currentTab === '参数'" class="p-4 text-sm w-full">
          <div class="flex flex-wrap w-full">
            <div
              v-for="(item, index) in detailAttributeList"
              :key="index"
              class="w-1/5 "
            >
              <div class="my-2 flex flex-col justify-center items-center">
                <div class="text-2xl font-bold text-red-500 my-1">
                  {{ item.value }}
                </div>
                <div class="text-base">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab === '评测'" class="p-4 text-sm w-full">
          <div class="flex flex-wrap w-full">
            <div
              v-for="(item, index) in detailReviewList"
              :key="index"
              class="w-1/5 "
            >
              <div class="my-2 flex flex-col justify-center items-center">
                <div class="text-2xl font-bold text-red-500 my-1">
                  {{ item.value }}
                </div>
                <div class="text-base">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab === '球员'" class="p-4 text-sm">
          <div class="flex flex-wrap">
            <div
              v-for="(item, index) in detail.racquet_players"
              :key="index"
              class="w-1-3 "
            >
              <div class="my-2 flex flex-col justify-center items-center">
                <img :src="item.player.avatar" class="w-32" />
                <div class="text-base">
                  {{ item.player.name }}
                </div>
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

import { reviewList, attributeList } from '@/utils/data'
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
      currentTabIndex: 0
    }
  },
  computed: {
    ...mapState(['setting']),
    ...mapGetters(['getName', 'getList']),
    currentTab: function() {
      return this.tabList[this.currentTabIndex]
    },
    tabList: function() {
      const review = this.detail.racquet_review ? '评测' : ''
      const player =
        this.detail.racquet_players && this.detail.racquet_players.length > 0
          ? '球员'
          : ''

      return this.detail
        ? ['介绍', '参数', review, player].filter(item => item)
        : []
    },
    detailAttributeList: function() {
      return this.detail && this.detail.racquet_detail
        ? Object.entries(this.detail.racquet_detail)
            .filter(([key, value]) => {
              return this.attributeList.some(att => att.key === key)
            })
            .map(([key, value]) => {
              return {
                name: this.attributeList.find(att => att.key === key).name,
                value
              }
            })
        : []
    },
    detailReviewList: function() {
      return this.detail && this.detail.racquet_review
        ? Object.entries(this.detail.racquet_review)
            .filter(([key, value]) => {
              return this.reviewList.some(att => att.key === key)
            })
            .map(([key, value]) => {
              return {
                name: this.reviewList.find(att => att.key === key).name,
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

    const detail = await context.$axios.$post('racquet/findOne', {
      where: {
        id
      },
      include: (app => {
        return [
          {
            model: app.model.racquet_detail
          },
          {
            model: app.model.racquet_review
          },
          {
            model: app.model.racquet_player,
            include: app.model.player
          }
        ]
      }).toString()
    })

    const chinese = await context.$axios.$post('common/translate', {
      content: detail.racquet_detail.desc
    })

    // const list = await context.$axios.$post('info/findAll', {
    //   where: {
    //     owner_id: id
    //   },
    //   order: [['publish_time', 'DESC']],
    //   limit: 24,
    //   attributes: {
    //     exclude: ['content']
    //   }
    // })
    const racquetName = `${detail.name} 网球拍`
    return {
      detail,
      // list,
      chinese,
      title: racquetName,
      keywords: racquetName,
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
