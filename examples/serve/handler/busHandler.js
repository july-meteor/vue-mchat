
function  put(io, data) {
    // 告诉用户消息发送成功
    io.emit('successful', data);
}




// 当做一个类来写
module.exports =(handler)=>{
    //客户端连接数量
    let onlineUserCount=0;
    //统计客户端登录用户
    let onlineUsers={};


    handler.on("open",socket =>{
        // 前置拦截
        let  channel = {
            onlineUserCount,
            onlineUsers,
            cid:socket.id,
            username:null,
            socket,
        }
        // 事件分发
        const EventEmitter = require('events');
        const event = new EventEmitter();
        // 基础事件处理
        const base =  require("./baseHandler")

        const room =  require("./roomHandler")
        base(channel,event);
        room(channel,event);
        // 注册事件
        let events= event._events;
        for(let key in events){
            socket.on(key, events[key]);
        }
    })
}





