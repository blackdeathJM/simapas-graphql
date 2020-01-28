import {enviarNotificacionDocInterna} from "../subscriptions/docInterna.subscription";

export async function agDocInterna(agNotificacion: any, pubsub: any, db: any)
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

export async function acVistoPorUsuario(usuario: string, folioInterno: string, pubsub: any, db: any)
{
    const dia = new Date().getDate();
    const mes = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();
    const fechaVisto = `${dia}/${mes}/${ano}`;

    return await db.collection("docInterna").findOneAndUpdate({$and: [{folioInterno}, {"usuarioDestino.usuario": usuario}]}, {
            $set: {
                "usuarioDestino.$.visto": true,
                "usuarioDestino.$.fechaVisto": fechaVisto
            }
        },
        false, true).then(
        async (res: any) =>
        {
            await enviarNotificacionDocInterna(pubsub, db);
            return {
                estatus: true,
                mensaje: 'La notificacion ha modificado como vista',
                docInterna: res.value
            }
        }
    ).catch();
}
