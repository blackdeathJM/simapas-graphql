import multer from "multer";
import path from "path";
import express from 'express';

const router = express.Router();


export async function subirArchivos(carpeta: string, tipoDeArchivo: string, _id: string)
{
    const storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/uploads'),
        filename: (req, file, cb) =>
        {
            // cb(null, uuidv4() + path.extname(file.originalname));
        }
    });
    switch (tipoDeArchivo)
    {
        case 'perfil':
            // lugar a donde se van a subir los archivos
            router.post('/uploads/images/' + carpeta, multer({
                storage,
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
                },
                limits: {fieldSize: 2000000}
            }).single('archivo'));
            break;
        case 'evidencia':
            router.post('/uploads/images/evidencias/' + carpeta, multer({}).array('evidencias', 10));
            break;
        case 'documentos':
            router.post('/uploads/documentos' + carpeta, multer({}).single);
            break;
    }
}
