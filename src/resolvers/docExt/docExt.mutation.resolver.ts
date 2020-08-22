import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB, FECHA_ACTUAL, PUB_SUB} from "../../config/global";
import {ObjectId} from "bson";
import {todosDocExt} from "./docExt.query.resolver";
import {Db} from "mongodb";
import {PubSub} from "apollo-server-express";


async function notTodosDocsExt(pubSub: PubSub, db: Db)
{
    return await pubSub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: todosDocExt(db)});
}

async function notActUsuarioSubProceso(pubsub: PubSub, db: Db, contexto: any)
{
    const database = db as Db;
    await database.collection(ENTIDAD_DB.DOC_EXTERNA).find(
        {usuarioDestino: {$elemMatch: {subproceso: {$in: JSON.parse(contexto)}}}}
    ).toArray().then(
        async (documentos) =>
        {
            const subscripcion = pubsub as PubSub;
            await subscripcion.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {usuarioSubprocesoSub: documentos});
        });
}

const mutationDocExt: IResolvers =
    {
        Mutation:
            {
                // PASO 1: Registrar el documento externo
                async regDocExt(_, {docExt}, {pubsub, db, contexto})
                {
                    const database = db as Db;
                    // Contamos el total de documentos para asignar el cosecutivo que sera el numero de seguimiento
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).countDocuments().then(
                        async (totalDocumentos) =>
                        {
                            docExt.noSeguimiento = totalDocumentos + 1;

                            return await database.collection(ENTIDAD_DB.DOC_EXTERNA).insertOne(docExt).then(
                                async (doc) =>
                                {
                                    // const datos = JSON.parse(objecto);
                                    // console.log('objecto', datos);
                                    await notTodosDocsExt(pubsub, db);
                                    await notActUsuarioSubProceso(pubsub, db, contexto);
                                    return {
                                        estatus: true,
                                        mensaje: 'El documento fue insertado con exito',
                                        documento: doc.ops
                                    }
                                }
                            ).catch(
                                async (error) =>
                                {
                                    return {
                                        estatus: false,
                                        mensaje: 'Ocurrio un error al tratar de registrar el documento: ' + error,
                                        documento: null
                                    }
                                }
                            )
                        }
                    ).catch(
                        async (error) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de contar los documentos: ' + error,
                                documento: null
                            }
                        });
                },
                //PASO: 2 Actualizamos la urldoc donde se guardara el nombre del archivo externo que sera el arhivo en el servidor y el cual podran ver los usuarios a los que se envia el documento
                // y hara una subscripcion para actualizar la lista de documentos en la tabla principal y activar notificacion
                async acDocExtUrl(_: void, {id, docUrl, proceso}, {pubsub, db, contexto})
                {
                    const database = db as Db;

                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).updateOne(
                        {_id: new ObjectId(id), usuarioDestino: {$elemMatch: {notificarUsuario: false}}},
                        {$set: {docUrl, proceso, "usuarioDestino.$[].notificarUsuario": true}},
                        {upsert: true}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            await notActUsuarioSubProceso(pubsub, db, contexto);
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

                async acDocUrlEnUsuarioDestino(_: void, {id, usuario, docUrl}, {pubsub, db, contexto})
                {
                    const baseDatos = db as Db;
                    return await baseDatos.collection(ENTIDAD_DB.DOC_EXTERNA).updateOne(
                        {_id: new ObjectId(id), usuarioDestino: {$elemMatch: usuario}},
                        {$set: {"usuarioDestino.$.docUrl": docUrl, "usuarioDestino.$.notificarAdministrador": true}},
                        {upsert: true}).then(
                        async (documento: any) =>
                        {
                            await notTodosDocsExt(pubsub, db);
                            await notActUsuarioSubProceso(pubsub, db, contexto);
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


// +++++++++++++++++++++++=============================+++++++++++++++++++++++++===================++++++++++++++++++++++++


            async acDocExtUrlUsuario(_, {id, usuario, docUrl}, {pubsub, db})
            {
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate({
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
            async acObEstUsuario(_, {_id, noProceso, usuario, observaciones, noSubproceso, estatus}, {pubsub, db})
            {
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate(
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

            // Actualizamos el noProceo, noSubproceso y estatus cuando se le asigna el folio
            async acEstEstGralUsuarioFolio(_, {_id, usuario, noSubproceso, noProceso, folio, estatus}, {pubsub, db})
            {
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id), "usuarioDestino.usuario": usuario},
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
            async acDocResUrlNoProceso(_, {folioRespuesta, noProceso, docRespUrl, folio, usuario, noSubproceso, estatus}, {pubsub, db})
            {
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate(
                    {_id: new ObjectId(folioRespuesta), "usuarioDestino.usuario": usuario},
                    {
                        $set: {
                            noProceso, docRespUrl, folio, "usuarioDestino.$.noSubproceso": noSubproceso,
                            "usuarioDestino.$.estatus": estatus
                        }
                    }).then(
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
                    db.collection(ENTIDAD_DB.FOLIOS).findOneAndDelete(folio);
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
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate(
                    {_id: new ObjectId(_id)},
                    {$set: {noProceso, folio, acuseUrl, fechaTerminado: FECHA_ACTUAL}},
                    {returnOriginal: false}).then(
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
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(documentoExternoInput._id)},
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
            },
            async acNotificar(_: void, {notificar, usuario, _id}, {pubsub, db})
            {
                const database = db as Db;
                return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id), "usuarioDestino.usuario": usuario},
                    {$set: {"usuarioDestino.$.notificar": notificar}}).then(
                    async (docExt: any) =>
                    {
                        await notTodosDocsExt(pubsub, db);
                        return {
                            estatus: true,
                            mensaje: 'Notificacion actualizada con exito',
                            documento: docExt.value
                        }
                    }
                ).catch(
                    async (error: any) =>
                    {
                        return {
                            estatus: false,
                            mensaje: 'Ocurrio un error al intentar actualizar la notificacion: ' + error,
                            documento: null
                        }
                    }
                )
            },
        }
    };
export default mutationDocExt;
