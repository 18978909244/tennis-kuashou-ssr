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
        <span>{{ detail.name }}</span>
      </div>
    </div>
    <div class="screen mx-auto bg-white p-24 rounded-lg">
      <div class="flex flex-col justify-center items-center py-4 border-b">
        <img
          :src="detail.image"
          :alt="detail.name"
          class="w-24 h-24 rounded-full my-2"
        />
        <h1 class="text-center text-2xl font-bold my-4">{{ detail.name }}</h1>

        <div class="text-gray-600">{{ detail.desc }}</div>
      </div>
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
      params: { id }
    } = context

    const detail = await context.$axios.$post('owner/findOne', {
      where: {
        id
      }
    })

    const list = await context.$axios.$post('info/findAll', {
      where: {
        owner_id: id
      },
      order: [['publish_time', 'DESC']],
      limit: 24,
      attributes: {
        exclude: ['content']
      }
    })
    return {
      detail,
      list,

      title: detail.name,
      keywords: detail.name,
      description: detail.desc
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
