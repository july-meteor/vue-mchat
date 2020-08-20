// 导入组件，组件必须声明 name
import MChatIndex from './index.vue'

MChatIndex.install = function (Vue) {
  Vue.component(MChatIndex.name, MChatIndex)
}

export default MChatIndex