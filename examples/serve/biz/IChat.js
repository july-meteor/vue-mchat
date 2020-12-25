const User = require("../models/User")
const Chat = require("../models/Chat")


/**
 *  添加会话
 * @param uId 用户id
 * @param sId
 * @returns {Promise<void>}
 */
async function joinChat(uId, cId) {
    const user = await User.findOne({id: uId});
    joinChatByUser(user,cId);
}

async function joinChatByUser(user, cId) {
    const chat = await Chat.findOne({id: cId});
    const {chats} = user;
    chats.push(chat._id)
    const {userList} = chat;
    userList.push(user._id)
    await User.findByIdAndUpdate(user._id, {
        $set: {
            chats
        }
    },{new: true} )
     const temp = await Chat.findByIdAndUpdate(chat._id, {
        $set: {
            userList
        }
    },{new: true})

}

// 创建群聊
async function createGroup(user,form){
    form.master = user._id;
    form.userList.push(user._id);
   const  group = await Chat.create(form);
    const chats = user.chats;
    chats.push(group._id);
    await User.findByIdAndUpdate(form.master, {
        $set: {
            chats
        }
    }, {new: true});
}

module.exports = {
    joinChat,
    joinChatByUser,
    createGroup,
}
