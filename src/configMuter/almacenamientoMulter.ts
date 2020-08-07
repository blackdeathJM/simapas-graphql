import multer from "multer";
import path from "path";
import fs from 'fs-extra';

export const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        let ruta = '../public/uploads/temp';
        let checarRuta = path.resolve(__dirname, ruta);
        if (!fs.pathExistsSync(checarRuta)) {
            fs.mkdirSync(checarRuta);
        }
        cb(null, path.join(__dirname, ruta));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
