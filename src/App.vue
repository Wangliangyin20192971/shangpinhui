<template>
  <div>
    <!-- <h1 v-upper.erha="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏 -->
    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  data(){
    return {
      msg:'aBC',
    }
  },
  components:{
    Header,
    Footer,
  },
  mounted(){
    //通知Vuex发请求，获取数据，存储在仓库当中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>