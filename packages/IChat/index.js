
/**
 *  chat interface 插槽
 */

// 导入组件，组件必须声明 name
import IChat from './src'

IChat.install = function (Vue) {
    Vue.component(IChat.name, IChat)
}

export default IChat