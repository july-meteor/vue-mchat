
/**
 *  chat interface 插槽
 */

// 导入组件，组件必须声明 name
import ChatRightList from './index.vue'


ChatRightList.install = function (Vue) {
  Vue.component(ChatRightList.name, ChatRightList)
}

export default ChatRightList