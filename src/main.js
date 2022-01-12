import Vue from 'vue'
import App from './App.vue'
import MChat from '../packages/index'
//
// import  './lib/MChat.css'
// import  MChat from './lib/MChat.umd'




Vue.use(MChat)

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
