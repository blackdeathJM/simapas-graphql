import {docInternaUsuarioVisto, todasNotificacionesDocInterna} from "../querys/docInterna.query";
import {subscripciones} from "../../config/constants";

export async function enviarNotificacionDocInterna(pubsub: any, db: any) {
    await pubsub.publish('cambioDocInterna', {cambioDocInterna: await todasNotificacionesDocInterna(db)});
}

export async function envNotiDocInternaUsuarioVisto(pubSub: any, usuario: string, db: any) {
    await pubSub.publish(subscripciones.NOT_DOC_INTERNA, {envNotUsuarioVisto: await docInternaUsuarioVisto(usuario, false, db)});
}

/*export async function envNotiDocInternaUsuarioVisto(pubSub: any, usuario: string, db: any) {
    await pubSub.publish(subscripciones.NOT_DOC_INTERNA, {payload: usuario})
}*/
