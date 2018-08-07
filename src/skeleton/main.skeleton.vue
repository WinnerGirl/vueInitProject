<template>
  <div class="main-skeleton">
    <w-skeleton width="100%" height="4.16rem" mt="0"></w-skeleton>
    <ul class="menu-skeleton flex-row">
      <li class="menu-item flex-1 text-center" v-for="i in [1,2,3,4]" :key="i">
        <w-skeleton height="0.4rem" width="80%"></w-skeleton>
      </li>
    </ul>
    <ul class="list-skeleton">
      <li class="list-item flex-row" v-for="i in [1,2,3]" :key="i">
        <div class="list-left flex-2">
          <w-skeleton width="100%" height="0.6rem"></w-skeleton>
          <div class="flex-row list-bottom">
            <div class="flex-1 text-left"><w-skeleton width="50%" height="0.3rem"></w-skeleton></div>
            <div class="flex-1 text-right"><w-skeleton width="50%" height="0.3rem"></w-skeleton></div>
          </div>
        </div>
        <div class="flex-1">
          <w-skeleton width="2.5rem" height="1.6rem"></w-skeleton>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
  import WSkeleton from '../components/Skeleton.vue'

  export default {
    data () {
      return {
      }
    },
    components: {
      WSkeleton
    }
  }
</script>

<style scoped>
  .main-skeleton{
    width: 100%;
    height: 100%;
  }
  .menu-item{
    height: 0.4rem;
  }
  .list-skeleton{
    padding: 0 0.3rem;
  }
  .menu-skeleton{
    padding: 0 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .list-left{
    height: 1.6rem;
    padding-right: 0.3rem;
  }
  .list-item{
    height: 2.2rem;
  }
  .list-bottom{
    margin-top: 0.7rem;
  }
  .title{
    margin-top: 20px;
  }
</style>
