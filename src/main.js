// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VvUI from 'vvui' // 引入组件库
import 'vvui/packages/theme-default/lib/index.css' // 引入样式库
import vuex from 'vuex'

Vue.use(VvUI)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vuex)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
