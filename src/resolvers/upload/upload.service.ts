import fs from 'fs-extra';
import path from "path";
import {randomUUID} from "crypto";
import {IFileStream} from "./upload.interface";

export class UploadService
{
    async _subir(files: Promise<IFileStream[]>, carpeta: string): Promise<string[]>
    {
        const listaNombres: string[] = [];
        const ano = new Date().getFullYear();

        try
        {
            for (const value of await files)
            {
                const {createReadStream, filename} = await value;

                const nvoNombre = carpeta + '-' + ano + randomUUID() + '.' + filename.split('.').pop();

                const checarRuta = path.join(__dirname, `../../public/uploads/${carpeta}`);

                const ruta = path.resolve(__dirname, `../../public/uploads/${carpeta}/${nvoNombre}`);

                const stream = createReadStream();

                if (!fs.existsSync(checarRuta))
                {
                    fs.mkdirSync(checarRuta);
                }

                const salida = fs.createWriteStream(ruta);
                stream.pipe(salida);
                listaNombres.push(nvoNombre);
            }
            return listaNombres;
        } catch (e)
        {
            console.log('error subir archivo', e);
            return [];
        }
    }
}


