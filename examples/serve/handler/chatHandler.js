const User = require("../models/User")
const Chat = require("../models/Chat")



/*
* 处理连接事件相关处理器
 */
module.exports =(channel,event)=>{
    let {onlineUserCount,onlineUsers,cid,userId,socket } =channel;

    // 获取消息
    event.on("message",function (data){
        const {mine, to, content, timestamp} = data;
        let message = {
            //消息来源用户名
            username: data.username,
            //消息来源用户头像
            avatar: data.avatar,
            //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
            id: to.id,
            //聊天窗口来源类型，从发送消息传递的to里面获取
            type: to.type,
            //消息内容
            content,
            //消息id，可不传。除非你要对消息进行一些操作（如撤回）
            cid: 0,
            //是否我发送的消息，如果为true，则会显示在右方
            mine: false,
            //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
            fromid: mine.id,
            //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
            timestamp,
        };
        socket.to(to.id).emit("receive",message);

    })





}