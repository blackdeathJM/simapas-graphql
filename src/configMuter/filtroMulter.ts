import multer from "multer";
import path from "path";
import {storage} from "./almacenamientoMulter";

export const subiArchivo = multer({
    storage,
    limits: {fileSize: 200000000},
    fileFilter: (req, file, cb) =>
    {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('El archivo no es soportado'), false);
    }
}).single('file');
