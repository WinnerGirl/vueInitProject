<template>
  <div v-cloak>
    <my-slider></my-slider>
  </div>
</template>

<script>

  export default {
    data () {
      return {
      }
    },
    components: {
      MySlider: () => import('../components/Slider.vue')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/color";
</style>
