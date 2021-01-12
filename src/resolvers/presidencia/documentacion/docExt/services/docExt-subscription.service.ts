import {Db} from "mongodb";
import {PUB_SUB} from "../../../../../config/global";
import {PubSub} from 'apollo-server-express'
import DocExtQueryService from "./docExt-query.service";
import DocUsuarioQueryService from "../../../../usuarios/documentos/services/doc-usuario-query.service";
import {subprocesos} from "../models/constantes";

export async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    // const resultado = await db.collection(COLECCION.DOC_EXTERNA).find().toArray();
    return await new DocExtQueryService({}, {}, {db})._todosDocsExt('ENTREGADO').then(async res =>
    {
        return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: res.documentos});
    });
}

export async function notUsuarioSubProceso(pubsub: PubSub, db: Db, usuarios: string[])
{
    return usuarios.filter(async u =>
    {
        return await new DocUsuarioQueryService({}, {}, {db})._doscUsuarioSubproceso(u, subprocesos).then(
            async res =>
            {
                return await pubsub.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {docSubProceso: res.documentos});
            })
    });
}
