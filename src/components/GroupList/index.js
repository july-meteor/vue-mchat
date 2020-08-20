
/**
 *  chat interface 插槽
 */

// 导入组件，组件必须声明 name
import MChatGroupList from './index.vue'


MChatGroupList.install = function (Vue) {
  Vue.component(MChatGroupList.name, MChatGroupList)
}

export default MChatGroupList