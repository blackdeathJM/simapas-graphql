import {IResolvers} from "graphql-tools";
import DocExtMutationService from "./services/docExt-mutation-service";

const mutationDocExt: IResolvers =
    {
        Mutation:
            {
                // PASO 1: Registrar el documento externo
                async regDocExt(_, {docExt}, {pubsub, db, contexto})
                {
                    return new DocExtMutationService(_, {docExt}, {pubsub, db, contexto}).agregarDocExt();
                },
                //PASO: 2 Actualizamos la urldoc donde se guardara el nombre del archivo externo que sera el arhivo en el servidor y el cual podran ver los usuarios a los que se envia el documento
                // y hara una subscripcion para actualizar la lista de documentos en la tabla principal y activar notificacion
                async acDocExtUrl(_, {_id, docUrl, proceso}, {pubsub, db, contexto})
                {
                    return new DocExtMutationService(_, {_id, docUrl, proceso}, {pubsub, db, contexto}).actualizarDocExtUrl();
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
                }
// +++++++++++++++++++++++=============================+++++++++++++++++++++++++===================++++++++++++++++++++++++
            // Actualizar docExt por entidad completamente
            /*            async acEntidadDocExt(_: void, {documentoExternoInput}, {pubsub, db})
                        {
                            const database = db as Db;
                            return await database.collection(COLECCION.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(documentoExternoInput._id)},
                                {$addToSet: documentoExternoInput}).then(
                                async (docExt: any) =>
                                {
                                    await notTodosDocsExt(pubsub, db);
                                    return {
                                        estatus: true,
                                        mensaje: 'Entidad actualizada con exito',
                                        documento: docExt.value
                                    }
                                }).catch(
                                async (error: any) =>
                                {
                                    return {
                                        estatus: false,
                                        mensaje: 'Ha ocurrido un error al intentar actualizar la entidad ' + error,
                                        documento: null
                                    }
                                });
                        },*/
        }
    };
export default mutationDocExt;
