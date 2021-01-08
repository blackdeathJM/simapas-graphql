import {Db} from "mongodb";
import {PUB_SUB} from "../../../../../config/global";
import {PubSub} from 'apollo-server-express'
import DocExtQueryService from "./docExt-query.service";
import DocQueryService from "../../../../usuarios/services/doc.query.service";


export async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    // const resultado = await db.collection(COLECCION.DOC_EXTERNA).find().toArray();
    return await new DocExtQueryService({}, {}, {db})._todosDocsExt('ENTREGADO').then(async res =>
    {
        return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: res.documentos});
    });
}

export async function notUsuarioSubProceso(pubsub: PubSub, db: Db, usuario: string, subProcesos: string[])
{
    return await new DocQueryService({}, {}, {db})._doscUsuarioSubproceso(usuario, subProcesos).then(
        async res =>
        {
            console.log('usu', usuario);
            return await pubsub.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {docSubProceso: res.documentos});
        })
}
