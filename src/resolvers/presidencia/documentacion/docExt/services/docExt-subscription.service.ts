import {Db} from "mongodb";
import {PUB_SUB} from "../../../../../config/global";
import {PubSub} from 'apollo-server-express'
import DocExtQueryService from "./docExt-query.service";
import DocQueryService from "../../../../usuarios/services/doc.query.service";
import {IUsuarioDestinoDocExt} from "../models/docExt.interface";

export async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    // const resultado = await db.collection(COLECCION.DOC_EXTERNA).find().toArray();
    return await new DocExtQueryService({}, {}, {db})._todosDocsExt('ENTREGADO').then(async res =>
    {
        return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: res.documentos});
    });
}

export async function notUsuarioSubProceso(pubsub: PubSub, db: Db, usuario: IUsuarioDestinoDocExt[], subProcesos: string[])
{
    return usuario.filter(async u =>
    {
        return await new DocQueryService({}, {}, {db})._doscUsuarioSubproceso(u.usuario, subProcesos).then(
            async res =>
            {
                return await pubsub.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {docSubProceso: res.documentos});
            })
    });
}
