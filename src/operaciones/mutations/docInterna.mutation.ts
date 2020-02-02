import {enviarNotificacionDocInterna} from "../subscriptions/docInterna.subscription";
import {FECHA_ACTUAL} from "../../config/constants";

export async function agDocumentoInterno(agNotificacion: any, pubsub: any, db: any)
{
    let totalNotificaciones = await db.collection("docInterna").countDocuments();

    if (totalNotificaciones != null) {
        totalNotificaciones += 1;

        agNotificacion.num = totalNotificaciones;
        let anoActual = new Date().getFullYear();

        agNotificacion.folioInterno = `FOL-${agNotificacion.num}-SIMAPAS/${anoActual}`;
        return await db.collection("docInterna").insertOne(agNotificacion).then(
            async () =>
            {
                await enviarNotificacionDocInterna(pubsub, db);
                // el usuario fue pasado por la cabecera, la definicion esta en el server en el contexto
                // await envNotiDocInternaUsuarioVisto(pubsub, usuario, db);
                return {
                    estatus: true,
                    mensaje: 'Datos agregados con exito',
                    docInterna: agNotificacion
                }
            }
        ).catch(
            async (error: any) =>
            {
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
            await enviarNotificacionDocInterna(pubsub, db);
            // await envNotiDocInternaUsuarioVisto(pubsub, usuario, db);
            return {
                estatus: true,
                mensaje: 'La notificacion ha modificado como vista',
                docInterna: res.value
            }
        }
    ).catch();
}
