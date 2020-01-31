import {SUBSCRIPCIONES} from "../../config/constants";
import {todosDocsExternos} from "../querys/docExterna.query";

export async function envNotificacionDocExt(pubsub: any, db: any)
{
    await pubsub.publish(SUBSCRIPCIONES.NOT_DOC_EXTERNA, {envNotDocExterna: await todosDocsExternos(db)})
}
