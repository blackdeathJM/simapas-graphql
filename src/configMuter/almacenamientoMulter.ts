import multer from "multer";
import path from "path";
import fs from 'fs-extra';

export const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        try
        {
            let ruta = '../public/uploads/temp';
            let checarRuta = path.resolve(__dirname, ruta);
            if (!fs.pathExistsSync(checarRuta))
            {
                fs.mkdirSync(checarRuta);
            }
            cb(null, path.join(__dirname, ruta));
        } catch (e)
        {
            console.log('error en el almacenamiento multer: ' + e)
        }
    },
    filename: (req, file, cb) =>
    {
        try
        {
            cb(null, file.originalname);
        } catch (e)
        {
            console.log('error en el nombre del archivo: ' + e);
        }
    }
});
