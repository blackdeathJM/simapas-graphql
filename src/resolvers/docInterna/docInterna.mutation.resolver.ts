import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB, FECHA_ACTUAL, SUBSCRIPCIONES} from "../../config/global";
import {todasNotificacionesDocInterna} from "./docInterna.query.Resolver";

async function notTodosDocInterna(pubsub: any, db: any) {
    await pubsub.publish(SUBSCRIPCIONES.NOT_DOC_INTERNA, {todosDocInterna: todasNotificacionesDocInterna(db)});
}

const mutationDocInterna: IResolvers =
    {
        Mutation:
            {
                async agDocInterna(_: void, {agNotificacion}, {pubsub, db}) {
                    let totalNotificaciones = await db.collection("docInterna").countDocuments();

                    if (totalNotificaciones != null) {
                        totalNotificaciones += 1;

                        agNotificacion.num = totalNotificaciones;
                        let anoActual = new Date().getFullYear();

                        agNotificacion.folioInterno = `FOL-${agNotificacion.num}-SIMAPAS/${anoActual}`;
                        return await db.collection(ENTIDAD_DB.DOC_INTERNA).insertOne(agNotificacion).then(
                            async (docInterna: any) => {
                                await notTodosDocInterna(pubsub, db);
                                return {
                                    estatus: true,
                                    mensaje: 'Datos agregados con exito',
                                    docInterna: docInterna.ops
                                }
                            }
                        ).catch(
                            async (error: any) => {
                                return {
                                    estatus: false,
                                    mensaje: 'Error en el servidor al intentar agregar la notificacion', error,
                                    docInterna: null
                                }
                            }
                        )
                    }
                },
                async acDocVistoUsuario(_: void, {folioInterno, usuario}, {pubsub, db}) {
                    return await db.collection("docInterna").findOneAndUpdate({$and: [{folioInterno}, {"usuarioDestino.usuario": usuario}]}, {
                        $set: {
                            "usuarioDestino.$.visto": true,
                            "usuarioDestino.$.fechaVisto": FECHA_ACTUAL
                        }
                    }).then(
                        async (res: any) => {
                            await notTodosDocInterna(pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'La notificacion ha modificado como vista',
                                docInterna: res.value
                            }
                        }
                    ).catch(
                        async (error: any) => {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de actualizar el estatus del mensaje: ' + error,
                                docInterna: null
                            }
                        }
                    );
                }
            }
    };
export default mutationDocInterna;
