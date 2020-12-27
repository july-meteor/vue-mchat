


/**
 *  socket 连接处理
 * @param app
 */
module.exports = (app, event) => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', socket => {
        event.emit("open",io,socket);

    });
    server.listen('3000', function () {
        console.log('server is running at port:3000.')
    })
}