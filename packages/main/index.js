
/**
 *  chat interface 插槽
 */

// 导入组件，组件必须声明 name
import ChatMain from './src/main'

ChatMain.install = function (Vue) {
    Vue.component(ChatMain.name, ChatMain)
}

export default ChatMain