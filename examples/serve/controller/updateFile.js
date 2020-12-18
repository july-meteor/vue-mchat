

router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = 'http://localhost:3000/uploads/' + req.file.filename;
    res.send(filePath);
})

//图标
router.get('/favicon.ico', function (req, res) {
    fs.readFile('./uploads/img02.jpg', function (err, data) {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data);
    })
})