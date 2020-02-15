import {IResolvers} from "graphql-tools";
import {COLECCIONES, FECHA_ACTUAL, SUBSCRIPCIONES} from "../../config/constants";
import {ObjectId} from "bson";
import {todosDocExt} from "./docExt.query.resolver";


async function notTodosDocsExt(pubSub: any, db: any)
{
    await pubSub.publish(SUBSCRIPCIONES.NOT_DOC_EXTERNA, {todosDocsExt: todosDocExt(db)});
}

const mutationDocExt: IResolvers =
    {
        Mutation:
            {
                // PASO 1: Registrar el documento externo
                async regDocExterno(_: void, {documentoExternoInput}, {pubsub, db})
                {
                    const totalDocExt = await db.collection(COLECCIONES.DOC_EXTERNA).countDocuments();
                    documentoExternoInput.noSeguimiento = totalDocExt + 1;
                    return await db.collection(COLECCIONES.DOC_EXTERNA).insertOne(documentoExternoInput).then(
                        async (agDocExt: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El documento fue registrado con exito',
                                documento: agDocExt.ops
                            }
                        }
                    ).catch(
                        async (err: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al intentar registrar el documento: ', err,
                                documento: null
                            }
                        }
                    )
                },
                // Actualizamos el docUrl del usuario donde se guardara el nombre del documento en lo que es aprobado por el administrador realizamos la subscripcion para que el administrador vea la liga
                // del documento y lo pueda revisar para aprobar o rechazar
                async acDocExtUrlUsuario(_: void, {id, usuario, docUrl}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
                            _id: new ObjectId(id),
                            "usuarioDestino.usuario": usuario
                        },
                        {$set: {"usuarioDestino.$.docUrl": docUrl}}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El documento fue actualizado con exito',
                                documento: documento.value
                            }
                        }
                    ).catch(
                        async (error: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al intentar actualizar el documento', error,
                                documento: null
                            }
                        }
                    );
                },
                // Actualizamos el campo de observaciones del subdocumento de usuarioDestino y pasamos al proceso de RECHAZADO
                async acObEstUsuario(_: void, {_id, noProceso, usuario, observaciones, noSubproceso, estatus}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate(
                        {
                            _id: new ObjectId(_id),
                            "usuarioDestino.usuario": usuario
                        },
                        {
                            $set: {
                                noProceso, "usuarioDestino.$.observaciones": observaciones,
                                "usuarioDestino.$.noSubproceso": noSubproceso, "usuarioDestino.$.estatus": estatus
                            }
                        }).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'Los datos se han actualizado con exito',
                                documento: documento.value
                            }
                        }).catch(
                        async (error: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al intentar actualizar los datos', error,
                                documento: null
                            }

                        });
                },
                //PASO: 2 Actualizamos la urldoc donde se guardara el nombre del archivo externo que sera el arhivo en el servidor y el cual podran ver los usuarios a los que se envia el documento
                // y hara una subscripcion para actualizar la lista de documentos en la tabla principal
                async acDocUrl(_: void, {id, docUrl, noProceso}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {docUrl, noProceso}}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El documento se ha actualizado con exito',
                                documento
                            }
                        }
                    ).catch(
                        async (error: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al intentar actualizar el documento', error,
                                documento: null
                            }
                        }
                    )
                },
                // Actualizamos el noProceo, noSubproceso y estatus cuando se le asigna el folio
                async acEstEstGralUsuarioFolio(_: void, {_id, usuario, noSubproceso, noProceso, folio, estatus}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id), "usuarioDestino.usuario": usuario},
                        {$set: {noProceso, folio, "usuarioDestino.$.noSubproceso": noSubproceso, "usuarioDestino.$.estatus": estatus}}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'Ha cambiado el estatus del documento',
                                documento: documento.value
                            }
                        }).catch((error: any) =>
                    {
                        return {
                            estatus: false,
                            mensaje: 'Hubo un error al tratar de actualizar el documento', error,
                            documento: null
                        }
                    })
                },
                // Actualizamos el campo donde se va a guardar el archivo cargado final por el usuario, el cual la busqueda folio al que se dio respuesta que es el id
                async acDocResUrlNoProceso(_: void, {folioRespuesta, noProceso, docRespUrl, folio, usuario, noSubproceso, estatus}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(folioRespuesta), "usuarioDestino.usuario": usuario},
                        {$set: {noProceso, docRespUrl, folio, "usuarioDestino.$.noSubproceso": noSubproceso, "usuarioDestino.$.estatus": estatus}}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El archivo fue colocado en la raiz del documento',
                                documento: documento.value
                            }
                        }).catch((error: any) =>
                    {
                        db.collection(COLECCIONES.FOLIOS).findOneAndDelete(folio);
                        return {
                            estatus: false,
                            mensaje: 'Error al intentar guardar el documento consulta al administrador', error,
                            documento: null
                        }
                    })
                },
                // Actualizamos el estatusGeneral del documento como el estatus del usuario a Terminado para dar por finalizado el proceso
                async acTerminarDoc(_: void, {_id, noProceso, acuseUrl, folio}, {pubsub, db})
                {
                    console.log('los datos llegan', _id, noProceso, acuseUrl, folio);
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id)},
                        {$set: {noProceso, folio, acuseUrl, fechaTerminado: FECHA_ACTUAL}}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El documento se ha actualizado con exito, y se ha dado por terminado el proceso',
                                documento: documento.doc
                            }
                        }).catch(
                        async (err: any) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ha ocurrido un error al intentar actualizar el documento' + err,
                                documento: null
                            }
                        }
                    )
                },
                // Actualizar docExt por entidad completamente
                async acEntidadDocExt(_: void, {documentoExternoInput}, {pubsub, db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(documentoExternoInput._id)},
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
                                mensaje: 'Ha ocurrido un error al intentar actualizar la entidad',
                                documento: null
                            }
                        });
                },
            }
    };
export default mutationDocExt;
