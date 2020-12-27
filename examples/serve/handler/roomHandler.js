/**
 *  消息处理器
 * @param channel 管道消息
 * @param event 事件器
 */



module.exports = (channel, event) => {

    const { socket } = channel;


    //加入房间
    event.on("joinRoom", function (data, fn) {
        socket.join(data.roomName); // join(房间名)加入房间
        fn({ "code": 0, "msg": "加入房间成功", "roomName": data.roomName });
    });

    //退出 离开房间
    event.on("leaveRoom", function (data, fn) {
        socket.leave(data.roomName);//leave(房间名) 离开房间
        fn({ "code": 0, "msg": "已退出房间", "roomName": data.roomName });
    });
    //监听客户端发送的 sendMsg 事件
    event.on("sendMsg", function (data) {
        // data 为客户端发送的消息，可以是 字符串，json对象或buffer

        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        // to(房间名)表示给除自己以外的同一房间内的socket用户推送消息.
        console.log(data)
        socket.broadcast.to(data.roomName).emit("receiveMsg", data);
    })
}
