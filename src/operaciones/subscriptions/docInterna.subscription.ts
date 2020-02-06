import {SUBSCRIPCIONES} from "../../config/constants";
import {todasNotificacionesDocInterna} from "../querys/docInterna.query";

export async function notDocInternaUsuarioVisto(pubsub: any, db: any) {
    await pubsub.publish(SUBSCRIPCIONES.NOT_DOC_INTERNA, {todosDocInterna: todasNotificacionesDocInterna(db)});
}
