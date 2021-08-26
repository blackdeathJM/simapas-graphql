import {UploadService} from "./upload.service";
import {GraphQLUpload} from "graphql-upload";


export const uploadMutation =
    {
        Upload: GraphQLUpload,
        Mutation:
            {

                subidaSimple: async (_: object, args: { file: any }) =>
                {
                    return new UploadService()._subidaSimple(args.file);
                },
                subidaMultiple: async (_:object, args: { files: any }) =>
                {
                    return new UploadService()._subidaMultiple(args.files)
                }
            }
    }
