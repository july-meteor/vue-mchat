
import SvgIcon from './index.vue'
// register globally


SvgIcon.install = function (Vue) {
    Vue.component('svg-icon', SvgIcon)
  }
  export default SvgIcon

  