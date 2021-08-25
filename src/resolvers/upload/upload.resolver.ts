import {UploadService} from "./upload.service";
import {GraphQLUpload} from "graphql-upload";


export const uploadMutation =
    {
        Upload: GraphQLUpload,
        Mutation:
            {

                subirArchivos: async (_: object, args: { file: File, multiple: boolean }) =>
                {
                    return new UploadService()._subirArchivos(args.file, args.multiple);
                }
            }
    }
