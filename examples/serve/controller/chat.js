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
    // 初始化数据库
    initSystem();
}


async function initSystem() {

    let admin = await  User.findOne({account: 'admin'});
    if (admin) {
        return
    }
    let userModel = {
        account: 'admin',
        password: 'admin',
        name: '七月',
        id: 0,
    }
    const lastUser = await  User.findOne({}).sort({id: -1});
    
    if (lastUser) {
        form.id = lastUser.id + 1;
    }
     admin =  await User.create(userModel)

    let group = await  Chat.findOne({id: 0});
    if (group) {
        return
    }
    let chatForm = {
        id: 0,
        avatar: '',
        name: '共同进步',
        type: 'group',
        desc: 'VUE-MChat群聊',
        master: undefined,
        userList: [],
    }

    await createGroup(admin,chatForm)
}




