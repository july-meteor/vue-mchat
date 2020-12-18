const express = require('express');
const app = express();


// // 压缩
// const compression = require('compression');
// app.use(compression());
// // jwt key
// app.set('jwtKey', 'meteor');
// // 加载数据库
// require('./db/db');
//
// const bodyParser = require('body-parser');
// app.use(express.json());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
//
// // parse application/json
// app.use(bodyParser.json())
//
// //cors跨域
// // app.use(require('cors')());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader("Access-Control-Expose-Headers", "*");
//     next();
// })
// //静态托管文件
// app.use('/uploads', express.static(__dirname + '/uploads'));



const EventEmitter = require('events');
const event = new EventEmitter();



// 注册处理器
const handler =  require('./handler/busHandler')
handler(event);
// 连接服务开启
const socket = require('./utils/socket');
socket(app,event)