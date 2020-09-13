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
        >
        <span>搜索 “{{ detail.name }}”</span>
      </div>
    </div>
    <div class="screen mx-auto bg-white p-24 rounded-lg">
      <h1 class="text-center text-2xl font-bold my-4">
        搜索：{{ detail.name }}
      </h1>
      <div class="text-center">找到 {{ count }} 条关联文章，展示前30条</div>

      <div class="container mx-auto lg:px-12">
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

import TopMenu from '@/components/TopMenu'
import Footer from '@/components/Footer'
import ArticleList from '@/components/ArticleList'
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
      params: { id }
    } = context

    const { count, rows: list } = await context.$axios.$post(
      'info/findAndCountAll',
      {
        where: {
          title: {
            $like: `%${id}%`
          }
        },
        order: [['publish_time', 'DESC']],
        limit: 30,
        attributes: [
          'cover_image',
          'title',
          'content_url',
          'resource_id',
          'digest',
          'is_show',
          'order',
          'weixinid',
          'publish_time'
        ]
      }
    )
    return {
      detail: {
        name: id
      },
      count,
      list,

      title: `搜索：${id}`
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
    init() {}
  }
}
</script>

<style scoped lang="less">
.screen {
  max-width: 1280px;
}
</style>
