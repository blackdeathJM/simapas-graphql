import {UploadService} from "./upload.service";
import {GraphQLUpload} from "graphql-upload";


export const uploadMutation =
    {
        Upload: GraphQLUpload,
        Mutation:
            {

                subidaSimple: async (_: object, args: { file: any, carpeta: string }) =>
                {
                    return new UploadService()._subidaSimple(args.file, args.carpeta);
                },
                subir: async (_: object, args: { files: any, carpeta: string }) =>
                {
                    return new UploadService()._subir(args.files, args.carpeta);
                }
            }
    }
