import MChat from './MChat'
import EventHub from './util/eventHub'
import MChatRightBox from './rightBox'
import MChatRightList from './groupList'
import MDialog from './element/dialog'
import MIcon from './element/icon'
import MessageBox from  './element/message-box'
import MPopver from  './element/popover'
import Notification from './element/notification'
import ApplyBox from  './system/apply'
import IChat from  './IChat'




import './styles/index.scss'


const components = [MChat, MChatRightBox, MChatRightList, MDialog,
    MPopver,
    MessageBox,
    Notification,
    ApplyBox,
    IChat,
]





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
    /**
     *  挂件
     */
    Vue.prototype.$IMessage = MessageBox;
    Vue.prototype.$IAlert = MessageBox.alert;
    Vue.prototype.$IConfirm = MessageBox.confirm;
    Vue.prototype.$IPrompt = MessageBox.prompt;
    Vue.prototype.$INotify = Notification;

    Vue.prototype.$applyFriend = ApplyBox.applyFriend;
    Vue.prototype.$applyGroup = ApplyBox.applyGroup;
    Vue.prototype.$confirmGroup = ApplyBox.confirmGroup;
    Vue.prototype.$confirmFriend = ApplyBox.confirmFriend;
};


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}


export default {
    version: '1.0.0',
    install,
    ...components
}