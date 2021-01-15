import {subiArchivo} from "./filtroMulter";
import path from "path";
import fs from 'fs-extra';
import {Request, Response} from "express";

export async function agDocs(req: Request, res: Response): Promise<any>
{
    subiArchivo(req, res, function (error: any)
    {
        try
        {
            if (error)
            {
                return res.status(501).json({'Ocurrio un error': error});
            }
            if (req.file.filename !== undefined)
            {
                // extraer el prefijo del archivo
                const obPrefijo = req.file.filename.split('-', 1).shift();
                let checarRuta = path.resolve(__dirname, `../public/uploads/${obPrefijo}`);

                if (!fs.pathExistsSync(checarRuta))
                {
                    fs.mkdirsSync(checarRuta);
                }

                let nvoRuta = path.resolve(__dirname, `../public/uploads/${obPrefijo}/` + req.file.filename);
                // chear el directorio para saber que los archivos que se esta guardando bienen del los
                // documentos externos que el usuarios sube de manera temporal para su aprobacion del admin

                if (fs.existsSync(nvoRuta))
                {
                    fs.removeSync(nvoRuta)
                }

                fs.moveSync(req.file.path, nvoRuta);
                // fs.rename(req.file.path, nvoRuta);
                return res.json({nombreOriginal: req.file.originalname, nombreSubido: req.file.filename})
            } else
            {
                return res.json({mensaje: 'Error al intentar agregar el archivo'});
            }
        } catch (error)
        {
            console.log('error inesperado', error);
        }
    });
}

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
