var Router = require('express');
var multer = require('multer');
var uuid = require('uuid');
var mime = require('mime');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = 'C:/Users/Youssef/Desktop/MediaData';

module.exports = function () {
    const router = Router();
    const upload = multer({
        storage: multer.diskStorage({
            destination: path,
            filename: (req, file, cb) => cb(null, generateFileId(file.mimetype)),
        }),
    });

    router.post('/upload', upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(500).json({
                error: 'no file attached',
                data: null,
            });
        }

        return res.status(200).json({
            error: null,
            file_name: req.file.filename,
        });
    });

    router.get('/:id', async (req, res) => {
        const filePath = path + '/' + req.params.id;
        return res.sendFile(filePath);
    });
    return router;
};


generateFileId = mimetype =>
    `${uuid.v4()}.${mime.getExtension(mimetype)}`;