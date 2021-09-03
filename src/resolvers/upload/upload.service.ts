import fs from 'fs-extra';
import path from "path";
import {randomUUID} from "crypto";

export class UploadService
{
    async _subir(files: any, carpeta: string): Promise<string[]>
    {
        const listaNombres: string[] = [];
        const ano = new Date().getFullYear();
        try
        {
            const res = await Promise.all(files);

            for (const value of res)
            {
                const {createReadStream, filename} = value as any;

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

                if (fs.existsSync(ruta))
                {
                    listaNombres.push(nvoNombre);
                }
            }

            return listaNombres;
        } catch (e)
        {
            console.log('error subir archivo', e);
            return [];
        }
    }
}


