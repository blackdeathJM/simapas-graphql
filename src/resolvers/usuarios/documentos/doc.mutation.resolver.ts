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
                async asigElfolioPorTipoDoc(_, {documento}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._asigElfolioPorTipoDoc(documento);
                },
                async genFolioRespDoc(_, {_id, usuario, centroGestor}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._genFolioRespDoc(_id, usuario, centroGestor);
                },
                docRespUrlAcuseUrl(_, {_id, documento, proceso, usuario, esInterno, esDocRespUrl}, {pubsub, db})
                {
                    return new DocUsuarioMutationService(_, {}, {pubsub, db})._docRespUrlAcuseUrl(_id, documento, proceso, usuario, esInterno,
                        esDocRespUrl);
                }
            }
    }
export default mutationDocUsuario;
