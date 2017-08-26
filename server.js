var express = require('express'),
    app = express(),
    // 接管webserver
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
// 静态服务器 声明当前目录是静态资源目录
// 为目录下每个资源构建静态url
app.use('/', express.static(__dirname + '/www'))
server.listen(3000)
io.sockets.on('connection', function (socket) {
    // 准备好了，已能连接
    // 广播电台
    socket.on('login', function (nickname) {
        socket.nickname = nickname
        users.push(nickname)
        socket.emit('loginSuccess')
        // 通知所有人 谁来了 现在有多少人在
        io.sockets.emit('system', nickname, users.length, 'login')
    })
})