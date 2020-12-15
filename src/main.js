
import Vue from 'vue'
import App from './App.vue'
import MChat from '../packages/index'


Vue.use(MChat)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
