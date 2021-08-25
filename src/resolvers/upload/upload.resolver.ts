import {IResolvers} from "graphql-middleware/dist/types";
import {UploadService} from "./upload.service";

export const uploadMutation: IResolvers =
    {
        Mutation:
            {
                async subirArchivos(_, {file, multiple})
                {
                    console.log('resolver', file, multiple);
                    return new UploadService()._subirArchivos(file, multiple);
                }
            }
    }
