// 导入组件，组件必须声明 name
import MChatRightBox from './index.vue'


MChatRightBox.install = function (Vue) {
  Vue.component(MChatRightBox.name, MChatRightBox)
}

export default MChatRightBox