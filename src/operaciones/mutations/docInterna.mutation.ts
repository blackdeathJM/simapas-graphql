import {COLECCIONES, FECHA_ACTUAL} from "../../config/constants";
import {notTodosDocInterna} from "../subscriptions/docInterna.subscription";

export async function agDocumentoInterno(agNotificacion: any, pubsub: any, db: any)
{
    let totalNotificaciones = await db.collection("docInterna").countDocuments();

    if (totalNotificaciones != null) {
        totalNotificaciones += 1;

        agNotificacion.num = totalNotificaciones;
        let anoActual = new Date().getFullYear();

        agNotificacion.folioInterno = `FOL-${agNotificacion.num}-SIMAPAS/${anoActual}`;
        return await db.collection(COLECCIONES.DOC_INTERNA).insertOne(agNotificacion).then(
            async (docInterna: any) =>
            {
                await notTodosDocInterna(pubsub, db);
                return {
                    estatus: true,
                    mensaje: 'Datos agregados con exito',
                    docInterna: docInterna.ops
                }
            }
        ).catch(
            async (error: any) =>
            {
                console.log('error', error);
                return {
                    estatus: false,
                    mensaje: 'Error en el servidor al intentar agregar la notificacion', error,
                    docInterna: null
                }
            }
        )
    }
}

export async function acVistoUsuario(folioInterno: string, usuario: string, pubsub: any, db: any)
{
    return await db.collection("docInterna").findOneAndUpdate({$and: [{folioInterno}, {"usuarioDestino.usuario": usuario}]}, {
        $set: {
            "usuarioDestino.$.visto": true,
            "usuarioDestino.$.fechaVisto": FECHA_ACTUAL
        }
    }).then(
        async (res: any) =>
        {
            return {
                estatus: true,
                mensaje: 'La notificacion ha modificado como vista',
                docInterna: res.value
            }
        }
    ).catch();
}
