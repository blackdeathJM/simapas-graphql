import {UploadService} from "./upload.service";
import {GraphQLUpload} from "graphql-upload";
import {IFileStream} from "./upload.interface";


export const uploadMutation =
    {
        Upload: GraphQLUpload,
        Mutation:
            {
                subir: async (_: object, args: { files: Promise<IFileStream[]>, carpeta: string }) =>
                {
                    return new UploadService()._subir(args.files, args.carpeta);
                }
            }
    }
