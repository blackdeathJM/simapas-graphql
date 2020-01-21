export async function agDocInterna(notificaion: any, db: any) {
    let totalNotificaciones = await db.collection("docInterna").countDocuments();
    if (totalNotificaciones != null) {
        totalNotificaciones += 1;

        notificaion.numNotificacion = totalNotificaciones;
        let anoActual = new Date().getFullYear();
        notificaion.folioInterno = `FOL-${notificaion.numNotificacion}-SIMAPAS/${anoActual}`;

        return await db.collection("docInterna").insertOne(notificaion).then(
            async () => {
                return {
                    estatus: true,
                    mensaje: 'Datos agregados con exito',
                    docInterna: notificaion
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
}

export async function acVistoPorUsuario(usuario: string, folioInterno: string, db: any) {
    return await db.collection("docInterna").findOneAndUpdate({$and: [{folioInterno}, {"usuarioDestino.usuario": usuario}]}, {$set: {"usuarioDestino.$.visto": true}},
        false, true).then(
        async (res: any) => {
            console.log('Notificacion vista', res);
            return {
                estatus: true,
                mensaje: 'La notificacion ha modificado como vista',
                docInterna: res.value
            }
        }
    ).catch();
}
