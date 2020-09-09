<template>
  <div class="">
    <TopMenu />
    <div class="bg-white">
      <div class="screen mx-auto py-8">
        <div>
          <nuxt-link to="/">
            <span class="cursor-pointer hover:text-blue-500"
              >小网球</span
            ></nuxt-link
          >
          > 资讯 >
          <span>{{ detail.title }}</span>
        </div>
      </div>
      <div class="screen mx-auto bg-white p-24 rounded-lg">
        <h1 class="text-center text-2xl font-bold my-4">{{ detail.title }}</h1>
        <div class="flex justify-between items-center my-20">
          <nuxt-link :to="`/owner/${detail.owner_id}`">
            <div class="flex items-center">
              <img
                :src="detail.owner.image"
                mode=""
                class="w-12 h-12 rounded-full"
              />
              <div class="ml-2">{{ detail.owner.name }}</div>
            </div></nuxt-link
          >
          <div class="text-gray-600">{{ detail.publish_time }}</div>
        </div>
        <div v-html="detail.content" class="mt-8"></div>
        <div v-if="linkList.length > 0" class="mt-18">
          <div class="py-2 border-b">推荐阅读</div>
          <div>
            <nuxt-link
              v-for="link in linkList"
              :key="link.id"
              :to="`/detail/${link.weixinid}`"
              class="mt-4 flex flex-col inline-block"
              >{{ link.title }}
              <span class="mr-2 text-gray-500 text-xs">{{
                link.publish_time
              }}</span>
            </nuxt-link>
          </div>
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
import Footer from '@/components/Footer'
export default {
  components: {
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
    ...mapState(['setting', 'infoList']),
    ...mapGetters(['getName', 'getList'])
  },
  async asyncData(context) {
    const {
      params: { id }
    } = context

    const detail = await context.$axios.$post('info/findOne', {
      where: {
        weixinid: id
      }
    })
    const linkList = await context.$axios.$post('info/link', {
      name: detail.title
    })
    return {
      detail: {
        ...detail,
        publish_time: moment(detail.publish_time).format('YYYY年MM月DD日')
      },
      linkList: linkList.map(item => {
        return {
          ...item,
          publish_time: moment(item.publish_time).format('YYYY年MM月DD日')
        }
      }),
      title: detail.title,
      keywords: detail.title,
      description: detail.title
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
