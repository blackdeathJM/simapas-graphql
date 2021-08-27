// import {finished} from "stream/promises";

import fs from 'fs-extra';
import path from "path";
import {finished} from "stream/promises";
import * as util from "util";

export class UploadService
{
    async _subidaSimple(file: any, carpeta: string)
    {
        const {createReadStream, filename, mimetype, encoding} = await file;
        console.log('+++', createReadStream, filename, mimetype, encoding);

        // Promise.all(res).then(r => console.log(r));
        // const stream = createReadStream();
        //
        // const out = require('fs').createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // // await finished(out);
        //
        // return { filename, mimetype, encoding };
    }

    async _subir(files: any, carpeta: string)
    {
        const res = await Promise.all(files);

        for (const value of res)
        {
            const {createReadStream, filename, mimetype, encoding} = value as any;
            const prefijo = filename.split('-', 1).shift();
            const checarRuta = path.join(__dirname, `../../public/uploads/${carpeta}`);
            const ruta = path.resolve(__dirname, `../../public/uploads/${carpeta}/${filename}`);
            console.log(checarRuta);
            console.log(fs.existsSync(checarRuta));
            console.log('prefijo');


            if (!fs.existsSync(checarRuta))
            {
                fs.mkdirSync(checarRuta);
            }

            if (fs.existsSync(ruta))
            {
                console.log('si existe el archivo');
            }

            // const stream = createReadStream();
            // const salida = fs.createWriteStream(ubicacion);
            // stream.pipe(salida);
            // const finished = util.promisify(stream.finished);
            // await finished(salida);
        }
    }
}
