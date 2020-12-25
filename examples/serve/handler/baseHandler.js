const User = require("../models/User")
const Chat = require("../models/Chat")



/*
* 处理连接事件相关处理器
 */
module.exports =(channel,event)=>{
    var {onlineUserCount,onlineUsers,cid,current,socket } =channel;
    event.on("online",  async data =>{
        const  user = await  User.findOne(data)
        current = user;
        const {_id ,online,chats,apply} = user
        const result = await  User.findByIdAndUpdate(_id,{
            $set:{
                online:true,
            }
        },{new:true})

      // 查询更新群组
       const chat =  await Chat.find({
            _id:{
                $in:user.chats
            }
        }).populate("userList");
        // 重置群组
        socket.emit("reset_chat",chat)

        socket.join(0);

        if(!onlineUsers.hasOwnProperty(current.id)){
            onlineUserCount ++;
            onlineUsers[current.id]=current.id;
        }
        console.log(current.id+' connection,当前在线人数:'+onlineUserCount);
    })


    event.on("disconnect", data =>{


        // 移出用户
        if(onlineUsers.hasOwnProperty(current.id)){
            onlineUserCount--;
            delete onlineUsers[current.id];
        }
        console.log(current.id+' disconnect,当前在线人数:'+onlineUserCount);
    })











}