import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from './components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from './components/Pagination'
Vue.component(Pagination.name, Pagination)
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入mockServe.js---mock数据
import './mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//统一接收api文件夹里面全部请求函数
import * as API from './api'
import kj from './assets/kj.jpg'

//引入插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:kj
});

//引入自定义插件
import myPlugins from './plugins/myPlugins'
//注册自定义插件
Vue.use(myPlugins,{
  name:'upper', 
});

//引入表单验证插件
import './plugins/validate'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由：底下的写法KV一致省略V（router小写的）
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册仓库：组件实例身上会多了一个属性：$store
  store,
}).$mount('#app')
