/*import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';
import {GraphQLUpload} from 'graphql-upload'

const uploadDir = './uploads';
mkdirp.sync(uploadDir);

const storeFS = ({stream, filename}) =>
{
    const id = shortid.generate();
    const path = `${uploadDir}/${id}-${filename}`;
    return new Promise((resolve, reject) =>
        stream.on('error', (error: any) =>
        {
            if (stream.truncate)
                fs.unlinkSync(path);
            reject(error)
        }).pipe(fs.createWriteStream(path))
            .on('error', (error: any) => reject(error))
            .on('finish', () => resolve({id, path}))
    )
};
 const subirArchivo = async (upload: any) =>
 {
 const {stream, filename, mimetype, encoding} = await upload;
 const {id, path} = await storeFS({stream, filename});
     return ({id, filename, mimetype, encoding, path})
 };
 export default {Upload: GraphQLUpload}*/
