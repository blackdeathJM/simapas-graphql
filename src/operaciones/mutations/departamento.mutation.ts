import {enviarNotificacionDepto} from "../subscriptions/departamento.subcription";

export async function registroDepto(departamento: any, pubsub: any, db: any)
{
    return await db.collection('departamentos').insertOne(departamento).then(
        async () =>
        {
            await enviarNotificacionDepto(pubsub, db);
            return {
                estatus: true,
                mensaje: `El departamento ${departamento.nombre} se registro de manera correcta`,
                departamento
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: `Error al intentar registrar el departamento`,
                departamento: null
            }
        }
    )
}
