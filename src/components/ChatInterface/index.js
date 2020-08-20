
/**
 *  chat interface 插槽
 */

// 导入组件，组件必须声明 name
import Chat_cover from './index.vue'


Chat_cover.install = function (Vue) {
  Vue.component(Chat_cover.name, Chat_cover)
}

export default Chat_cover