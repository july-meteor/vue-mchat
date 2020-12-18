const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
//上传文件
const multer = require('multer');
const fs = require('fs');
const { send } = require('process');
const upload = multer({
    dest: __dirname + '/uploads'
})







module.exports = router;