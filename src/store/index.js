import Vue from 'vue'
import Vuex from 'vuex'
import skeleton from './skeleton'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    skeleton
  },
  // 开启严格模式
  strict: process.env.NODE_ENV !== 'production'
})
