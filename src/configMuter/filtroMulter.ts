import multer from "multer";
import {almacenamiento} from "./almacenamientoMulter";

export const subiArchivo = multer({
    storage: almacenamiento,
    limits: {fileSize: 20 * 1024 * 1024},
    fileFilter: (req, file, cb) =>
    {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype === "application/pdf")
        {
            cb(null, true);
        } else
        {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('file');
