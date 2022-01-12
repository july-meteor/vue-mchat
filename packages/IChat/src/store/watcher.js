import Vue from 'vue'
import {setCache, getCache, removeCache} from './cache'


/**
 * cache key
 */
const key_channels = 'key_channels';
const key_sys_msg = 'key_sys_msg';

/**
 *  默认带有 频道
 *  1. 系统消息
 * @type {*[]}
 */
let default_system_message =
    {
        // 频道id
        id: -1,
        name: "系统消息",
        type: "sys_msg",
        messages: []
    };

/**
 *  一个store 模式来为ichat 做全局状态管理
 */
export default Vue.extend({
    data() {
        return {
            states: {
                // 全部数据
                data: {},
                mine: {},
                // 好友列表
                friends: [],
                //自己
                groups: [],
                //对话列表
                channel: getCache(key_channels) || [],
                // systemMessage: getCache(key_sys_msg) || default_system_message,
                // channel: [],
                systemMessage:  default_system_message,

                // 系统消息
            }
        }
    },
    // 方法
    methods: {
        // 创建频道
        buildChannel(channel) {
            let channels = this.states.channel;
            let len = channels.length;
            if (len < 1) {
                // 直接插入
                this.commit('insertChannel', channel);
                return
            }
            let flag = true;
            const {id, type} = channel;
            for (let i = 0; i < len; i++) {
                let model = channels[i];
                if (model.id === id && model.type === type) {
                    flag = false;
                }
            }
            if (flag) {
                this.commit('insertChannel', channel)
            }
        },
        buildSysChannel() {
            this.buildChannel(this.states.systemMessage);
            this.replaceSystemMessage();

        },
        replaceSystemMessage(){
            this.commit("replaceChannel", this.states.systemMessage);
        },
        // 检查消息 如果
        checkingMessage(message) {
            let channels = this.states.channel;
            let len = channels.length;
            let flag = true;
            const {id, type} = message;
            if (len < 1) {
                flag = true;
            } else {
                for (let i = 0; i < len; i++) {
                    let model = channels[i]
                    if (model.id === id && model.type === type) {
                        flag = false;
                    }
                }
            }

            if (flag) {
                let channel;
                if (message.type === 'group') {
                    const {groups} = this.states;
                    for (let group of groups) {
                        if (group.id === id) {
                            channel = group;
                            channel.type = 'group';
                            channel.groupName = '群组';
                            break;
                        }
                    }
                } else if (message.type === 'friend') {
                    const {friends} = this.states;
                    for (const friend of friends) {
                        const {userList} = friend
                        for (const user  of userList) {
                            if (user.id === id) {
                                channel = user;
                                channel.type = 'friend';
                                channel.groupName = '我的好友';
                                break;
                            }
                        }
                    }
                }
                this.commit('insertChannel', channel)
            }
        },
        // 新的系统消息
            newSystemMessage(message) {
                this.commit('updateSystemMessage', message)
            },
        removeChannel({id, type}) {
            let channels = this.states.channel;
            let len = channels.length;
            if (len < 1) {
                //空数组
                return
            }
            let flag = 0;
            for (let i = 0; i < len; i++) {
                let model = channels[i]
                if (model.id === id && model.type === type) {
                    flag = i;
                }
            }
            this.commit('removeChannel', flag)
        },
        // 获取好友分组
        getFriendGroup() {
            let options = [];
            this.states.friends.forEach(item => {
                options.push({label: item.name, key: item.index, value: item.index})
            })
            return options;
        },
    }

})

