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

export async function actualizarDepto(_id: any, nombreDeptoActualizar: any, db: any)
{
    console.log('Valor del id del departamento', _id);
    console.log('Datos del departamento actualizar', nombreDeptoActualizar);
    return await db.collection('departamentos').updateOne(
        {_id: _id},
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
    );
}

