import Watcher from './watcher'

/**
 *  channel 的数据过滤列表
 */
const channel_group_model = ["id", 'name', 'type', 'userList', 'notices', 'avatar'];
const channel_friend_model = ["id", 'name', 'type', 'online', 'avatar'];

import { setCache, removeCache } from './cache'

/**
 * cache key
 */
const key_channels = 'key_channels'
const key_sys_msg = 'key_sys_msg'


Watcher.prototype.mutations = {

    setFriends(states, friends)
    {
        states.friends = friends;
    },
    // 针对单人删除
    setFriend(states, item) {

    },

    setGroups(states, groups) {
        states.groups = groups;
    },
    //对话排序变更
    changeChannel() {


    },
    // 插入对话
    insertChannel(states, channel) {
        states.channel.unshift(filterChannelParams(channel));
        setCache(key_channels, states.channel);
    },
    // 替换
    replaceChannel(states, channel) {
        const { id, type } = channel;
        let len = states.channel.length;
        if (len < 1) {
            return
        }
        for (let i = 0; i < len; i++) {
            let model = states.channel[i]
            if (model.id === id && model.type === type) {
                replaceChannelParams(channel, model);
                break;
            }
        }
        setCache(key_channels, states.channel);
    },
    // 删除对话
    removeChannel(states, index) {
        // delete 会留下  空项
        // delete states.channel[index]
        states.channel.splice(index, 1)
        setCache(key_channels, states.channel);
    },
    //设置系统消息
    setSystemMessage(states, data) {
        states.systemMessage.messages = data;
    },
    // 插入新的消息
    updateSystemMessage(states, message) {
        let len = states.systemMessage.messages.length;
        let mark = -1;
        for (let i = 0; i < len; i++) {
            let item = states.systemMessage.messages[i];
            if (item.id === message.id) {
                mark = i;
                break;
            }
        }
        if (mark < 0) {
            states.systemMessage.messages.push(message);
        } else {
            states.systemMessage.messages[mark] = message;
        }
    }
}

function indexSystemMessage(list = []) {
    let channels = list;
    let len = channels.length;
    for (let i = 0; i < len; i++) {
        let model = channels[i]
        if (model.id === -1 && model.type === "sys_msg") {
            return i;
        }
    }
}
/**
 * 
 *  过滤一些非必要属性
 * @param {*} channel 
 */
function filterChannelParams(channel) {
    let data = {}, filters = [];
    if (channel.type === 'group') {
        filters = channel_group_model;
    } else if (channel.type === 'friend') {
        filters = channel_friend_model;
    } else if (channel.type === 'sys_msg') {
        return channel;
    }

    for (let key of filters) {
        data[key] = channel[key];
    }
    return data;
}

/**
 * 
 * 上面注释掉的方法是为了警示自己。
 * 上方 的方法和这个方法的本质差别在于一个是过滤出新的对象，一个是改变对象的引用
 * 对应组件中改变的是chat这个属性，里面内容改变vue是无法监听到的。
 * 
 * @param {*} data 
 * @param {*} channel 
 */
function replaceChannelParams(data, channel) {
    let filters = [];
    if (data.type === 'group') {
        filters = channel_group_model;
    } else if (data.type === 'friend') {
        filters = channel_friend_model;
    } else if (data.type === 'sys_msg') {
        channel = data;
    }
    for (let key of filters) {
        channel[key] = data[key];
    }
}


// 提交属性
Watcher.prototype.commit = function (name, ...args) {
    const mutations = this.mutations;
    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args));
    } else {
        throw new Error(`Action not found: ${name}`);
    }
};
export default Watcher;