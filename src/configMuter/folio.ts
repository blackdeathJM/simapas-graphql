import {Request, Response} from "express";
import {uploadArchivo} from "./filtroMulter";
import path from "path";

export async function agFolio(req: Request, res: Response): Promise<any>
{
    uploadArchivo(req, res, function (error)
    {
        if (error) {
            return res.status(501).json({error});
        }
        return res.json({nombreOriginal: req.file.originalname, nombreSubido: req.file.filename})
    });
}

export async function obFolio(req: Request, res: Response): Promise<any>
{
    res.sendFile(path.resolve(__dirname, '../public/uploads/temp/a46eb00a-eb95-426c-807a-cd36a949994c.pdf'));
}
