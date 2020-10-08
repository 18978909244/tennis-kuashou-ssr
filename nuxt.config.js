const axios = require('axios')
const webpack = require('webpack')
const LRU = require('lru-cache')
const pkg = require('./package')
module.exports = {
  mode: 'universal',
  // model:'spa',
  server: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 3197 // default: 3000
  },
  telemetry: false,
  // cache: true,
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    script: [{
      src: 'https://hm.baidu.com/hm.js?18f698b22eef9dcffbf83383c1c52265'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  components: true,

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/main.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/axios'],
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // 'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/tennis': {
      target: 'http://127.0.0.1:3001'
      // changeOrigin: true,
      // pathRewrite: {
      //   '^/shop': ''
      // }
    }
  },
  router: {
    middleware: ['auth']
  },
  output: {
    globalObject: 'this'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  render: {
    resourceHints: false,
    bundleRenderer: {
      cache: new LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    extractCSS: {
      allChunks: true
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery'
      // })
    ],
    // publicPath: 'http://localhost:3001/software',
    /*
     ** You can extend webpack config her
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      const lessResourcesLoader = {
        loader: 'less-loader'
        // options: {
        //   resources: ['assets/style/theme.less', 'assets/style/mixins.less']
        // }
      }
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.less.push(lessResourcesLoader)
        }
        if (rule.test.toString() === '/\\.less$/') {
          rule.use.push(lessResourcesLoader)
        }
      })
    }
  }
}
