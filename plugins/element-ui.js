import Vue from 'vue'
import {
  Button,
  Input,
  Image,
  Carousel,
  CarouselItem,
  Form,
  Table,
  Switch,
  Menu,
  FormItem,
  MenuItem,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Dialog,
  ColorPicker,
  MenuItemGroup,
  InputNumber,
  Message,
  Submenu,
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
    .use(Form)
    .use(FormItem)
    .use(Table)
    .use(Switch)
    .use(Menu)
    .use(MenuItem)
    .use(MenuItemGroup)
    .use(TableColumn)
    .use(Popover)
    .use(Tag)
    .use(Upload)
    .use(Dialog)
    .use(ColorPicker)
    .use(Submenu)
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
