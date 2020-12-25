import Vue from 'vue'
import App from './App.vue'
import '../lib/MChat.css'
import MChat from '../lib/MChat.umd'
import io from "socket.io-client"


Vue.config.productionTip = false


const socket = io("http://localhost:3000");
Vue.use(MChat)
//插入
Vue.mixin({
    data() {
        return {
            socket
        }
    }
})
new Vue({
  render: h => h(App),
}).$mount('#app')
