import multer from "multer";
import path from "path";
import express from 'express';
import uuidv4 from "uuidv4";

const router = express.Router();


export async function subirArchivos(carpeta: string, tipoDeArchivo: string, _id: string)
{
    const storage = multer.diskStorage({
        destination: path.join(__filename, 'uploads'),
        filename: (req, file, cb) =>
        {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    });
    const subirArchivo = multer({
        storage,
        limits: {fileSize: 1000000}
    });
    switch (tipoDeArchivo)
    {
        case 'perfil':
            // lugar a donde se van a subir los archivos
            router.post('/uploads/images/' + carpeta, multer({
                dest: path.join(__dirname, '../uploads'),
                fileFilter: function (req, file, cb)
                {
                    let filetypes = /jpeg|jpg|png/;
                    let mimetype = filetypes.test(file.mimetype);
                    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                    if (mimetype && extname)
                    {
                        return cb(null, true);
                    } else
                    {
                        cb(null, false);
                    }
                }
            }).single('imgPerfil'));
            break;
        case 'evidencia':
            router.post('/uploads/images/evidencias/' + carpeta, multer({}).array('evidencias', 10));
            break;
        case 'documentos':
            router.post('/uploads/documentos' + carpeta, multer({}).single);
            break;
    }
}
