import multer from "multer";
import path from "path";
import {almacenamiento} from "./almacenamientoMulter";

export const subiArchivo = multer({
    storage: almacenamiento,
    limits: {fileSize: 200000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    }
}).single('file');
