const Chat = require("../models/Chat")

const User = require("../models/User")
const {createGroup} = require("../biz/IChat")

// 断言慎用
const assert = require('http-assert');


const resultVO = {
    flag: false,
    msg: undefined,
    data: undefined,
}

module.exports = (router) => {
    // 会话初始化
    initChat();
}


async function initChat() {

    let group = await  Chat.findOne({id: 0});
    if (group) {
        return
    }
    let form = {
        id: 0,
        avatar: '',
        name: '共同进步',
        type: 'group',
        desc: 'VUE-MChat群聊',
        master: undefined,
        userList: [],
    }
    const admin = await  User.findOne({account: 'admin'});
    if (!admin) {
        return
    }
    createGroup(admin,form)
}




