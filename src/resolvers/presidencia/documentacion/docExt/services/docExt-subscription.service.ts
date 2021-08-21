import {Db} from "mongodb";
import {PUB_SUB} from "../../../../../config/global";

import DocExtQueryService from "./docExt-query.service";
import DocUsuarioQueryService from "../../../../usuarios/documentos/services/doc-usuario-query.service";
import {subprocesos} from "../models/constantes";
import {PubSub} from "graphql-subscriptions";

export async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    const res = await new DocExtQueryService({}, {db})._todosDocsExt('ENTREGADO');

    return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: res.documentos});
}

export async function notUsuarioSubProceso(pubsub: PubSub, db: Db, usuarios: string[])
{
    usuarios.filter(async u =>
    {
        const res = await new DocUsuarioQueryService({}, {db})._doscUsuarioSubproceso(u, subprocesos);

        await pubsub.publish(PUB_SUB.DOC_EXT_SUB_PROCESO, {docSubProceso: res.documentos});
    });
}
