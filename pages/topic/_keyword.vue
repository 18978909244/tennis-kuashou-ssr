<template>
  <div class="">
    <TopMenu />
    <div class="screen mx-auto py-8">
      <div>
        <nuxt-link to="/">
          <span class="cursor-pointer hover:text-blue-500"
            >小网球</span
          ></nuxt-link
        >
        > 资讯 >
        <span>{{ detail.name }}</span>
      </div>
    </div>
    <div class="screen mx-auto bg-white p-24 rounded-lg">
      <h1 class="text-center text-2xl font-bold my-4">{{ detail.name }}</h1>
      <!-- <div>{{ detail.publish_time }}</div> -->

      <div class="container mx-auto lg:px-12">
        <!-- <div
            class="w-64 mx-auto text-center text-2xl font-bold py-8 border-b"
          >
            {{ detail.name }}
          </div> -->
        <div class="mt-16 ">
          <ArticleList :list="list" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import moment from 'dayjs'

import ArticleList from '@/components/ArticleList'

import TopMenu from '@/components/TopMenu'
import Footer from '@/components/Footer'
export default {
  components: {
    ArticleList,
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
      imageHeight: 500
    }
  },
  computed: {
    ...mapState(['setting']),
    ...mapGetters(['getName', 'getList'])
  },
  async asyncData(context) {
    const {
      params: { keyword }
    } = context
    console.log(keyword)
    if (!keyword)
      return context.error({ statusCode: 404, message: 'Page not found' })
    const detail = await context.$axios.$post('keyword/findOne', {
      where: {
        key: keyword
      }
    })
    if (!detail)
      return context.error({ statusCode: 404, message: 'Page not found' })

    const list = await context.$axios.$post('info/findAll', {
      where: {
        title: {
          $like: `%${detail.name}%`
        },
        order: -1
      },
      order: [['publish_time', 'DESC']],
      limit: 24,
      attributes: {
        exclude: ['content']
      }
    })
    console.log('list', list)
    return {
      detail,
      list
    }
  },
  head() {
    return {
      title: this.detail.title
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {}
  }
}
</script>

<style scoped lang="less">
.screen {
  max-width: 1280px;
}
</style>
