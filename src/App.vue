<template>
  <div id="app">
    <!--<main-skeleton></main-skeleton>-->
    <main-skeleton v-if="!hide"></main-skeleton>
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    computed: {
      ...mapState('skeleton', {
        hide: state => state.hide
      })
    },
    components: {
      MainSkeleton: () => import('./skeleton/main.skeleton.vue')
    }
  }
</script>

<style lang="scss">
  @import "assets/styles/basic";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
</style>
