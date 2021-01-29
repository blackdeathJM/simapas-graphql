import {IResolvers} from "graphql-tools";
import DocExtMutationService from "./services/docExt-mutation.service";

const mutationDocExt: IResolvers =
    {
        Mutation:
            {
                // PASO 1: Registrar el documento externo
                async regDocExt(_, {docExt}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._regDocExt(docExt);
                },
                async desactivarNot(_, {_id, usuario}, {db})
                {
                    return new DocExtMutationService(_, {}, {db})._desactivarNot(_id, usuario);
                },
                // Rechazar el documento y mandar observaciones cambiamos el subproceso a RECHAZADO y notificamos al usuarios y mandamos notificacion
                async aprobarRechazarDoc(_, {_id, usuario, subproceso, observaciones}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._aprobarRechazarDoc(_id, usuario, subproceso, observaciones);
                },
                async acDarPorEntregado(_, {documento}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._darPorEntregado(documento);
                },
                async acInfoDoc(_, {documento}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._acInfoDoc(documento);
                },
                async quitarUsuario(_, {_id, usuarioDestino}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._quitarUsuario(_id, usuarioDestino)
                }
            }
    };
export default mutationDocExt;
