<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    //监听bannerList数据的变化（空数组-->含四个元素的数组）
    list: {
      immediate: true,
      handler() {
        //页面加载完成，结构已经存在，v-for运行完成
        this.$nextTick(() => {
          //在new Swiper实例之前，页面中结构必须要有
          new Swiper(this.$refs.cur, {
            loop: true,
            //如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球可切换图片
              clickable: true,
            },
            //如果需要前进、后退按钮
            navigation: {
              nextEl: ".swiper-button-prev",
              prevEl: ".swiper-button-next",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>