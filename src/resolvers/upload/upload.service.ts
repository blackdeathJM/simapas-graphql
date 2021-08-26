// import {finished} from "stream/promises";

export class UploadService
{
    async _subidaSimple(file: any)
    {
        // const {createReadStream, filename, mimetype, encoding} = await file;
        const res = await file.map(async (val: any) => await val);

        console.log(res);

        // Promise.all(res).then(r => console.log(r));
        // const stream = createReadStream();
        //
        // const out = require('fs').createWriteStream('local-file-output.txt');
        // stream.pipe(out);
        // // await finished(out);
        //
        // return { filename, mimetype, encoding };
    }

    _subidaMultiple(files: any)
    {
        const res = Promise.resolve(files);
    }
}
