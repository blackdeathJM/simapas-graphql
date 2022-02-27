// import {subiArchivo} from "./filtroMulter";
import path from "path";
import fs from 'fs-extra';
import {Request, Response} from "express";

export async function obDocs(req: Request, res: Response): Promise<any>
{
    try
    {
        let archivoUrl = req.query.archivoUrl;
        let carpeta = req.params.archivoUrl;
        const archivo = path.resolve(__dirname, `../public/uploads/${carpeta}/${archivoUrl}`);

        if (carpeta === 'per')
        {
            if (fs.existsSync(archivo))
            {
                return res.sendFile(archivo);
            } else
            {
                await fs.copyFile(path.resolve(__dirname, `../public/uploads/${carpeta}/perfil.png`), archivo);
                return res.sendFile(archivo);
            }
        } else
        {
            return res.sendFile(archivo);
        }
    } catch (e)
    {
        console.log('error al tratar de enviar documento', e);
    }
}
