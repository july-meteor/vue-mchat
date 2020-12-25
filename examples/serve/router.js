const express = require('express');
const router = express.Router();
const login = require("./controller/login")
const chat =  require("./controller/chat")



login(router)
chat(router)

router.use((err, req, resp, next) => {
    resp.status(err.statusCode || 500).send(err);
})



const multer = require('multer');
const upload = multer({
    dest: __dirname + '/uploads'
})

router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = 'http://localhost:3000/uploads/' + req.file.filename;
    res.send(filePath);
})





module.exports = router;