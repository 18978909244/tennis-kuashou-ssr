import Vue from 'vue'
import {
  Button,
  Input,
  Image,
  Carousel,
  CarouselItem,
  Switch,
  Popover,
  Tag,
  Dialog,
  InputNumber,
  Message,
  Loading,
  MessageBox,
  Tooltip
} from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import moment from 'dayjs'

export default () => {
  // Vue.use(Element, { locale })
  Vue.use(Image)
    .use(Carousel)
    .use(CarouselItem)
    .use(Input)
    .use(InputNumber)
    .use(Button)
    .use(Switch)
    .use(Popover)
    .use(Tag)
    .use(Dialog)
    .use(Tooltip)

  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$message = Message

  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service

  Vue.filter('priceFilter', price => {
    return price ? price.toFixed(2) : 0
  })

  Vue.filter('moment', (time, format) => {
    return moment(time).format(format || 'YYYY-MM-DD HH:mm:ss')
  })
}
