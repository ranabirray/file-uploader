const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());

const fileStore = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'files'); //specify destination folder
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); //specify file name
    }
})

const upload = multer({ storage: fileStore }).single('file');

//upload api
app.post('/upload', (req, res) => {

    upload(req, res, function (err) {
        //check for multer error
        if (err instanceof multer.MulterError)
            res.status(500).json({ message: err });
        //check for general error
        else if (err)
            res.status(500).json({ message: err });

        return res.status(200).send(req.file);
    })
});

//start server
app.listen(port, (err) => {
    if (err)
        console.log(err);

    console.log('server intialized at', port);
})