import {Request, Response} from "express";
import {uploadArchivo} from "./filtroMulter";
import path from "path";
import fs from 'fs-extra';

export async function agFolio(req: Request, res: Response): Promise<any>
{
    uploadArchivo(req, res, function (error)
    {
        if (error) {
            return res.status(501).json({error});
        }
        if (req.file.filename) {
            let nvoRuta = path.resolve(__dirname, '../public/uploads/folios/' + req.file.filename);
            fs.move(req.file.path, nvoRuta);
            // fs.rename(req.file.path, nvoRuta);
            return res.json({nombreOriginal: req.file.originalname, nombreSubido: req.file.filename})
        } else {
            return res.json({mensaje: 'Error al intentar agregar el archivo'});
        }
    });
}

export async function obFolio(req: Request, res: Response): Promise<any>
{
    let archivoUrl = req.query.archivoUrl;
    return res.sendFile(path.resolve(__dirname, `../public/uploads/folios/${archivoUrl}`));
}
