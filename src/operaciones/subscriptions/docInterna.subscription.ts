import {SUBSCRIPCIONES} from "../../config/constants";
import {todasNotificacionesDocInterna} from "../querys/docInterna.query";

export async function notTodosDocInterna(pubsub: any, db: any) {
    await pubsub.publish(SUBSCRIPCIONES.NOT_DOC_INTERNA, {todosDocInterna: todasNotificacionesDocInterna(db)});
}

export async function notAgNvaDocInterna(nvaDocInterna: any, pubSub: any) {
    await pubSub.publish(SUBSCRIPCIONES.NOT_DOC_INTERNA_AG, {notAgDocInterna: nvaDocInterna})
}
