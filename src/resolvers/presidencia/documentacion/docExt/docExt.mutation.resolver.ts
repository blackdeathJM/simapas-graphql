import {IResolvers} from "graphql-tools";
import DocExtMutationService from "./services/docExt-mutation.service";

const mutationDocExt: IResolvers =
    {
        Mutation:
            {
                // PASO 1: Registrar el documento externo
                async regDocExt(_, {docExt, procesos}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {}, {pubsub, db})._regDocExt(docExt, procesos);
                },
                // Actualizar el docUrl del usuarios donde subira la respuesta que guardaremos de manera temporal
                async acDocUrlEnUsuarioDestino(_, {_id, usuario, docUrl, subproceso}, {pubsub, db})
                {
                    return new DocExtMutationService(_, {_id, usuario, docUrl, subproceso}, {pubsub, db}).actualizarDocUrlUsuarioDestino();
                },
                async acNotificacionPorUsuario(_, {id, usuario, notificarRespDelUsuario, notificarAdministrador}, {db})
                {
                    return new DocExtMutationService(_, {id, usuario, notificarRespDelUsuario, notificarAdministrador}, {db}).acNoticiacionPorUsuario();
                },
                // Rechazar el documento y mandar observaciones cambiamos el subproceso a RECHAZADO y notificamos al usuarios y mandamos notificacion
                async acObservacionesRechazarDocExt(_, {id, usuario, subproceso, notificarRespDelUsuario, observaciones}, {pubsub, contexto, db})
                {
                    return new DocExtMutationService(_, {id, usuario, subproceso, notificarRespDelUsuario, observaciones},
                        {pubsub, contexto, db}).observacionesRechazarDocExt();
                },
                // Aprobar el documento
                async acAprobarDocumentoExt(_, {id, usuario, subproceso, autorizado}, {pubsub, contexto, db})
                {
                    return new DocExtMutationService(_, {id, usuario, subproceso, autorizado},
                        {pubsub, contexto, db}).aprobarDocumento();
                },
                async acDarPorEntregado(_, {_id}, {pubsub, contexto, db})
                {
                    return new DocExtMutationService(_, {_id}, {pubsub, contexto, db}).darPorEntregado();
                },
                async acAcuse(_, {_id, acuseUrl, proceso}, {db, pubsub})
                {
                    return new DocExtMutationService(_, {_id, acuseUrl, proceso}, {db, pubsub})._acuse();
                },
                async acInfoDoc(_, {documento}, {db, pubsub})
                {
                    return new DocExtMutationService(_, {}, {db, pubsub})._acInfoDoc(documento);
                }
            }
    };
export default mutationDocExt;
