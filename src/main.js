import 'element-ui/lib/theme-chalk/index.css';
import './styles/im.scss'
import './styles/index.scss'

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import MChat from '@/components'

Vue.use(ElementUI)


Vue.use(MChat)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
