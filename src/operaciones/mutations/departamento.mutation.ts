import {enviarNotificacionDepto} from "../subscriptions/departamento.subcription";

export async function registroDepto(depto: any, pubsub: any, db: any)
{
    return await db.collection('departamentos').insertOne(depto).then(
        async () =>
        {
            await enviarNotificacionDepto(pubsub, db);
            return {
                estatus: true,
                mensaje: `El departamento ${depto.nombre} se registro de manera correcta`,
                departamento: depto
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

export async function actualizarDepto(_id: string, nombreDeptoActualizar: any, db: any)
{
    console.log('ID desde la consola', _id);
    console.log('nombre del departamento desde la consola', nombreDeptoActualizar);
    return await db.collection('departamentos').updateOne(
        {_id},
        {$set: {nombreDeptoActualizar}}
    ).then(
        async () =>
        {
            return {
                estatus: true,
                mensaje: 'El departamento se actualizo de manera correcta',
                departamento: nombreDeptoActualizar
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Error al actualizar el departamento',
                departamento: null
            }
        }
    )
}
