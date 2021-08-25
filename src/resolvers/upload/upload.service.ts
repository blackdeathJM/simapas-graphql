// import {finished} from "stream/promises";

export class UploadService
{
    async _subirArchivos(file: any, multiple: boolean)
    {
        const {createReadStream, filename, mimetype, encoding} = await file;
        console.log('respu', createReadStream, filename, mimetype, encoding, multiple);
        //
        // const stream = createReadStream();
        //
        // const out = require('fs').createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // // await finished(out);
        //
        // return { filename, mimetype, encoding };
    }
}
