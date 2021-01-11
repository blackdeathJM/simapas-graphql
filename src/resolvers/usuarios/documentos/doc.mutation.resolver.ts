import {IResolvers} from "graphql-tools";
import DocUsuarioMutationService from "./services/doc-usuario-mutation.service";

const mutationDocUsuario: IResolvers =
    {
        Mutation:
            {
                // Actualizar el docUrl del usuarios donde subira la respuesta que guardaremos de manera temporal
                async acDocUrlEnUsuarioDestino(_, {_id, usuario, docUrl, subproceso}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._acDocUrlEnUsuarioDestino(_id, usuario, docUrl, subproceso);
                },
                async regFolio(_, {documento}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._regFolio(documento);
                },
                async genFolioRespDoc(_, {_id, usuario, centroGestor}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._genFolioRespDoc(_id, usuario, centroGestor);
                }
            }
    }
export default mutationDocUsuario;
