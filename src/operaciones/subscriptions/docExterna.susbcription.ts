import {SUBSCRIPCIONES} from "../../config/constants";
import {todosDocsExternos} from "../querys/docExterna.query";

export async function notTodosDocsExt(pubsub: any, db: any) {
    await pubsub.publish(SUBSCRIPCIONES.NOT_DOC_EXTERNA, {todosDocsExt: await todosDocsExternos(db)})
}
