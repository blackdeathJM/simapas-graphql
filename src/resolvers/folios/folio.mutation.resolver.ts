import {IResolvers} from "graphql-tools";
import FolioMutationService from "./services/folio.mutation.service";

const mutationFolios: IResolvers =
    {
        Mutation:
            {
                async registroFolio(_, {folio}, {db})
                {
                    return new FolioMutationService(_, {folio}, {db}).registrarFolio();
                },
                async acUrlFolio(_, {id, archivoUrl}, {db, pubsub})
                {
                    return new FolioMutationService(_, {id, archivoUrl}, {db, pubsub})._acUrlFolio();
                },
            }
    };
export default mutationFolios;
