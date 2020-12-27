const User = require("../models/User")
const Chat = require("../models/Chat");





/*
* 处理连接事件相关处理器
 */
module.exports = (channel, event) => {
    let { onlineUserCount, serve, onlineUsers, socket } = channel;
    event.on("online", async data => {
        const user = await User.findOne(data)
        // 备份需要的数据
        socket.uid = user.id;
        socket._id = user._id;
        socket.name = user.name;
        socket.avatar = user.avatar;
        // const {_id ,online,chats,apply} = user
        await User.findByIdAndUpdate(user._id, {
            $set: {
                online: true,
            }
        }, { new: true })

        // 查询更新群组
        const chatList = await Chat.find({
            _id: {
                $in: user.chats
            }
        }).populate("userList");
        if (chatList) {
            socket.join(chatList[0].id);
            userChangeNotify(chatList);
            // 重置群组
            socket.emit("reset_chat", chatList)
        }

        if (!onlineUsers.hasOwnProperty(socket.uid)) {
            onlineUserCount++;
            onlineUsers[socket.uid] = {
                uid: socket.uid,
                sid: socket.id,
            };
        }
        console.log(' connection,当前在线人数:' + onlineUserCount);
    })


    event.on("disconnect", async data => {

        if (!socket._id) {
            return false;
        }

        const user = await User.findByIdAndUpdate(socket._id, {
            $set: {
                online: false,
            }
        }, { new: true });


        // 回话又要通知一遍。。。
        // 查询更新群组
        const chatList = await Chat.find({
            _id: {
                $in: user.chats
            }
        }).populate("userList");
        userChangeNotify(chatList);

        // 移出用户
        if (onlineUsers.hasOwnProperty(socket.uid)) {
            onlineUserCount--;
            delete onlineUsers[socket.uid];
        }
        // console.log(' disconnect,当前在线人数:'+onlineUserCount);
    })




    //  通知 当前回话成员状态变更
    function userChangeNotify(chatList) {
        if (!chatList) return;

        let notifyList = {};
        for (let chat of chatList) {
            const { userList } = chat
            // 加入房间
            for (let tempUser of userList) {
                notifyList[tempUser.id] = tempUser.id;
            }
        }
        // 不通知自己
        delete notifyList[socket.uid];

        for (let item in notifyList) {
            let temp = onlineUsers[item];
            // console.log(onlineUsers)
            if (temp) {
                // 发送事件给上线的
                const toSocket = serve.sockets.sockets[temp.sid];
                if (toSocket) {
                    toSocket.emit("change_status_chat")
                }
            }
        }


    }








}