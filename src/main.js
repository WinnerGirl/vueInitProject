// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Toast from './plugins/toast'

Vue.config.productionTip = false
Vue.use(Toast)

router.afterEach((to, from) => {
  setTimeout(() => {
    store.commit('skeleton/setSkeletonStatus', { hide: true })
  }, 250)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
