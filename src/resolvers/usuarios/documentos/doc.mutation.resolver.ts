import {DocUsuarioMutationService} from "./services/doc-usuario-mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";

export const mutationDocUsuario: IResolvers =
    {
        Mutation:
            {
                async acDocUrlEnUsuarioDestino(_, {_id, usuario, docUrl, subproceso}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {pubsub, db})._acDocUrlEnUsuarioDestino(_id, usuario, docUrl, subproceso);
                },
                async asigElfolioPorTipoDoc(_, {documento, refDoc}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {pubsub, db})._asigElfolioPorTipoDoc(documento, refDoc);
                },
                async genFolioRespDoc(_, {_id, usuario, centroGestor}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {pubsub, db})._genFolioRespDoc(_id, usuario, centroGestor);
                },
                async docRespUrlAcuseUrl(_, {_id, documento, proceso, usuario, esInterno, esDocRespUrl}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {pubsub, db})._docRespUrlAcuseUrl(_id, documento, proceso, usuario, esInterno,
                        esDocRespUrl);
                },
                async terminarDocUsuario(_, {_id}, {db})
                {
                    return new DocUsuarioMutationService(_, {db})._terminarDocUsuario(_id);
                }
            }
    }
