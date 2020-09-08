import {Db} from "mongodb";
import {COLECCION, PUB_SUB} from "../../../config/global";
import {PubSub} from 'apollo-server-express'


export async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    const resultado = await db.collection(COLECCION.DOC_EXTERNA).find().toArray();
    return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: resultado});
}

export async function notActUsuarioSubProceso(pubsub: PubSub, db: Db, contexto: any)
{
    const resultado = await db.collection(COLECCION.DOC_EXTERNA).find(
        {usuarioDestino: {$elemMatch: {subproceso: {$in: JSON.parse(contexto)}}}}).toArray();
    return await pubsub.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {pubsubSubproceso: resultado});
}