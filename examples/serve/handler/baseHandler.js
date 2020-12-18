

/*
* 处理连接事件相关处理器
 */
module.exports =(channel,event)=>{
    var {onlineUserCount,onlineUsers,cid,username,socket } =channel;
    event.on("connection", data =>{
        username = data.name
        if(!onlineUsers.hasOwnProperty(username)){
            onlineUserCount ++;
            onlineUsers[username]=username;
        }
        console.log(username+' connection,当前在线人数:'+onlineUserCount);
        // socket.emit("open")
    })

    event.on("disconnect", data =>{
        // 移出用户
        if(onlineUsers.hasOwnProperty(username)){
            onlineUserCount--;
            delete onlineUsers[username];
        }
        console.log(username+' disconnect,当前在线人数:'+onlineUserCount);
    })










}