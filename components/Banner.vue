<template>
  <div id="banner">
    <el-carousel
      id="el-carousel"
      :height="imageHeight + ''"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="item in list"
        :key="item.id"
        :style="`height:${imageHeight}px`"
      >
        <nuxt-link :to="`/detail/${item.weixinid}`">
          <el-image
            ref="bannerHeight"
            :src="item.cover_image"
            @load="imgLoad"
            :style="`height:${imageHeight}px`"
            fit="fit"
            class="w-full"
          ></el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
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
    return {
      imageHeight: 500
    }
  },
  mounted() {
    this.initBannerHeight()
    window.onresize = () => {
      console.log('dd')
      this.initBannerHeight()
    }
  },
  methods: {
    async imgLoad(e) {
      await this.$nextTick()
      console.log(
        'this.$refs.bannerHeight[0].imageHeight',
        document.querySelector('#banner').clientHeight
      )
      console.log(document.querySelector('#banner').clientHeight)
      this.imageHeight =
        (document.querySelector('#banner').clientWidth * 600) / 1500
    },
    initBannerHeight() {
      this.imageHeight =
        (document.querySelector('#banner').clientWidth * 600) / 1500
      document.getElementById('el-carousel').style.height =
        this.imageHeight + 'px'
    }
  }
}
</script>

<style>
.el-carousel__container {
  height: 100% !important;
}
</style>
