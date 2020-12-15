import MChatIndex from './chat'
import MChat from './chatInterface'
import EventHub from './util/eventHub'
import MChatRightBox from './rightBox'
import MChatRightList from './groupList'
import MDialog from './element/dialog'
import MIcon from './element/icon'
import ELPopver from  './element/popover'


import './styles/index.scss'


const components = [MChat, MChatIndex, MChatRightBox, MChatRightList, MDialog, MIcon,ELPopver]

// const req = require.context('./SvgIcon/svg/', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const iconMap = requireAll(req)


// 初始化  函数  ，需要将 mcaht组件 自动挂载到 app 下
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    components.forEach(component => {
        //自动挂载
        Vue.component(component.name, component);
    });
    // 
    //观察者
    Vue.prototype.$im = EventHub
};


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}


export default {
    version: '1.0.0',
    install,
    ...components
}