import { ObjectId } from "bson";

// import {enviarNotificacionDepto} from "../subscriptions/departamento.subcription";

export async function registroDepto(depto: any, pubsub: any, db: any)
{
    return await db.collection('departamentos').insertOne(depto).then(
        async () =>
        {
            return depto;
        }
    ).catch(
        async () =>
        {
            return null
        }
    );
}

export async function actualizarDepto(_id: ObjectId, nombre: string, db: any)
{
    return await db.collection('departamentos').updateOne(
        {_id: new ObjectId(_id)},
        {$set: {nombre}},
    ).then(
        async () =>
        {
            return {
                _id,
                nombre
            }
        }
    ).catch(
        async () =>
        {
            return null
        }
    );
}
