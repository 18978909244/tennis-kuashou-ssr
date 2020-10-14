<template>
  <div class="subpixel-antialiased">
    <TopMenu />
    <div class="py-16 bg-gray-100">
      <div class="container mx-auto lg:px-12">
        <Banner :list="infoList.slice(0, 3)" />
      </div>
    </div>
    <div class="py-16 bg-white">
      <div class="flex justify-center mt-4">
        <input
          v-model="search"
          placeholder="请输入关键词"
          type="text"
          password="false"
          placeholder-class="placeholder"
          maxlength="140"
          class="w-64 text-center border rounded-sm py-1 text-xl"
        />
        <div
          @click="search && $router.push(`/search/${search}`)"
          class="cursor-pointer bg-red-500 text-white ml-2 px-4 rounded flex items-center justify-center font-bold"
        >
          搜索
        </div>
      </div>
    </div>
    <div class="py-16 bg-white">
      <div class="container mx-auto lg:px-12">
        <div class="w-64 mx-auto text-center text-2xl font-bold py-8 border-b">
          网球公众号
        </div>
        <div class="flex flex-wrap mt-8">
          <nuxt-link
            :to="`/owner/${item.id}`"
            v-for="item in ownerList"
            :key="item.id"
          >
            <div
              class="m-4 cursor-pointer flex flex-col justify-center items-center bg-gray-200 p-8 rounded-lg"
            >
              <img :src="item.image" class="w-16 h-16 rounded-full" />
              <div class="text-sm mt-4">{{ item.name }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="py-16 bg-gray-100">
      <div class="container mx-auto lg:px-12">
        <div class="w-64 mx-auto text-center text-2xl font-bold py-8 border-b">
          网球话题
        </div>
        <div class="mt-16 flex flex-wrap">
          <nuxt-link
            :to="`/topic/${item.key}`"
            v-for="item in keywordList"
            :key="item.id"
          >
            <div
              class="m-2 py-1 px-4 bg-red-500 text-white rounded cursor-pointer"
            >
              {{ item.name }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="py-16 bg-white">
      <div class="container mx-auto lg:px-12">
        <div class="w-64 mx-auto text-center text-2xl font-bold py-8 border-b">
          最新资讯
        </div>
        <div class="mt-16 flex flex-wrap">
          <ArticleList :list="infoList.slice(3, 12)" />
        </div>
      </div>
    </div>

    <div class="py-16 bg-gray-100">
      <div class="container mx-auto lg:px-12">
        <div class="flex justify-between items-center ">
          <div class="font-bold">推荐网球拍</div>
          <div class="text-gray-500 text-xs">更多网球拍 ></div>
        </div>
        <div class="flex flex-wrap justify-between items-stretch my-10">
          <nuxt-link
            :to="`/racquet/${item.id}`"
            v-for="item in randomRacquetList"
            :key="item.id"
            class="w-1/6"
          >
            <div class="cursor-pointer">
              <div class="m-4">
                <div class="bg-white rounded-lg overflow-hidden flex flex-col">
                  <el-image
                    :src="item.thumb_image"
                    class="w-24 mx-auto"
                  ></el-image>
                  <div class="text-gray-700 p-4">
                    <div class="my-2 text-sm">{{ item.name }} 网球拍</div>
                    <div
                      class="text-white text-center mt-4 text-sm bg-red-500 px-2 py-1 rounded"
                    >
                      {{ item.brand }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="py-16 bg-white">
      <div class="container mx-auto lg:px-12">
        <div class="flex justify-between items-center ">
          <div class="font-bold">推荐网球线</div>
          <div class="text-gray-500 text-xs">更多网球线 ></div>
        </div>
        <div class="flex flex-wrap justify-between items-stretch my-10">
          <nuxt-link
            :to="`/string/${item.id}`"
            v-for="item in randomStringList"
            :key="item.id"
            class="w-1/6"
          >
            <div class="cursor-pointer">
              <div class="m-4">
                <div class="bg-white rounded-lg overflow-hidden flex flex-col">
                  <el-image :src="item.image" class="w-24 mx-auto"></el-image>
                  <div class="text-gray-700 p-4">
                    <div class="my-2 text-sm">{{ item.name }} 网球线</div>
                    <div
                      class="text-white text-center mt-4 text-sm bg-red-500 px-2 py-1 rounded"
                    >
                      总评：{{ item.overall }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- <div class="py-16 bg-white">
      <div class="container mx-auto lg:px-12">
        <div class="flex justify-between items-center ">
          <div class="font-bold">猜你喜欢</div>
          <div class="text-gray-500 text-xs">更多资讯 ></div>
        </div>
        <div class="flex flex-wrap justify-between items-stretch my-10">
          <nuxt-link
            :to="`/detail/${item.weixinid}`"
            v-for="item in randomList"
            :key="item.id"
            :class="`w-1/${randomNumber}`"
          >
            <div class="cursor-pointer">
              <div class="m-4">
                <div class="bg-white rounded-lg overflow-hidden flex flex-col">
                  <el-image
                    :src="item.cover_image"
                    class="w-full h-32"
                  ></el-image>
                  <div class="text-gray-700 p-4">
                    <div class="my-2 text-sm">{{ item.title }}</div>
                    <div class="text-gray-600 mt-4 text-sm">
                      {{ item.publish_time | moment('YYYY-MM-DD HH:mm') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div> -->

    <div class="py-16 bg-gray-100">
      <div class="container mx-auto lg:px-12">
        <div class="flex justify-between items-center ">
          <div class="font-bold">猜你喜欢</div>
          <div class="text-gray-500 text-xs">更多资讯 ></div>
        </div>
        <div class="flex flex-wrap justify-between items-stretch my-10">
          <nuxt-link
            :to="`/detail/${item.weixinid}`"
            v-for="item in randomInfoList"
            :key="item.id"
            class="w-1/6"
          >
            <div class="cursor-pointer">
              <div class="m-4">
                <div class="bg-white rounded-lg overflow-hidden flex flex-col">
                  <el-image
                    :src="item.cover_image"
                    class="w-full h-32"
                  ></el-image>
                  <div class="text-gray-700 p-4">
                    <div class="my-2 text-sm">{{ item.title }}</div>
                    <div class="text-gray-600 mt-4 text-sm">
                      {{ item.publish_time | moment('YYYY-MM-DD HH:mm') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'dayjs'
import TopMenu from '@/components/TopMenu'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import ArticleList from '@/components/ArticleList'
export default {
  // name: 'Home',
  components: { ArticleList, TopMenu, Footer, Banner },
  // serverCacheKey() {
  //   // Will change every 10 secondes
  //   const cacheTime = Math.floor(Date.now() / (1000 * 60))
  //   return cacheTime
  // },
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
      search: ''
      // time: new Date()
    }
  },
  computed: {
    ...mapState([
      'setting',
      'infoList',
      'racquetList',
      'keywordList',
      'ownerList'
    ]),
    ...mapGetters(['getName', 'getList']),
    cooperateNumber: function() {
      const startTime = moment('2018-01-01')
      const number = Math.round(1.1 * moment().diff(startTime, 'weeks'))
      return number
    },
    submitAvaiable: function() {
      return (
        this.form.name &&
        this.form.mobile &&
        this.form.type.length > 0 &&
        this.form.price
      )
    }
  },
  async asyncData(context) {
    const { store, $axios } = context
    const randomInfoNumber = 5
    const randomRacquetNumber = 6
    const stringRacquetNumber = 6
    const randomInfoList = await $axios.$post('info/random', {
      number: randomInfoNumber,
      attributes: ['id', 'cover_image', 'title', 'publish_time', 'weixinid']
    })
    const randomRacquetList = await $axios.$post('racquet/random', {
      number: randomRacquetNumber
    })
    const randomStringList = await $axios.$post('string/random', {
      number: stringRacquetNumber
    })
    // console.log('randomRacquetList', randomRacquetList)
    return {
      // randomInfoNumber,
      randomInfoList,
      randomRacquetList,
      randomStringList,
      // randomRacquetNumber,
      title: store.getters.getName('seo_index_title') || '小网球',
      description:
        store.getters.getName('seo_index_desc') ||
        '小网球 | 汇集网球资讯、网球技术、网球视频、网球球员等精彩内容","小网球，做最全的网球网，收录所有最新最热网球信息","网球，网球拍，网球技术，网球视频，网球资讯，网球社区',
      keywords:
        store.getters.getName('seo_index_keyword') ||
        '网球，网球拍，网球技术，网球视频，网球资讯，网球社区'
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
  created() {},
  mounted() {
    // if (process.browser) {
    //   import('wowjs').then(WOW => {
    //     new WOW.WOW().init()
    //   })
    // }
  },
  methods: {
    // onSubmit() {
    //   this.submitLoading = true
    //   setTimeout(() => {
    //     this.submitLoading = false
    //     this.$message.success('提交成功，我们已经收到您的需求')
    //     this.form = {
    //       name: '',
    //       mobile: '',
    //       type: [],
    //       price: '',
    //       desc: ''
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style scoped lang="less"></style>
