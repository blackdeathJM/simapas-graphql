import express from 'express';
import multer from "multer";
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        console.log(file.location);
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) =>
    {
        console.log('En el filename', req);
        console.log('El file de filename', file);
        console.log('el callback del filename', cb);
        cb(null, file.originalname);
    }
});

const uploadArchivo = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) =>
    {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname)
        {
            return cb(null, true);
        }
        cb(null, false);
    }
}).single('file');

router.post('/upload', function (req, res, next)
{
    uploadArchivo(req, res, function (err)
    {
        if (err)
        {
            return res.status(501).json({error: err});
        }
        // agregar las funcionalidades para la base de datos
        return res.json({originalname: req.file.originalname, uploadname: req.file.filename});
    })
});

module.exports = router;
