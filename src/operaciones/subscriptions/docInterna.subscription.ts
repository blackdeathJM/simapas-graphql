import {docInternaUsuarioVisto, todasNotificacionesDocInterna} from "../querys/docInterna.query";
import {SUBSCRIPCIONES} from "../../config/constants";

export async function enviarNotificacionDocInterna(pubsub: any, db: any)
{
    await pubsub.publish(SUBSCRIPCIONES.DOCINTERNA, {cambioDocInterna: await todasNotificacionesDocInterna(db)});
}

export async function envNotiDocInternaUsuarioVisto(pubSub: any, usuario: string, db: any)
{
    await pubSub.publish(SUBSCRIPCIONES.NOT_DOC_INTERNA, {envNotUsuarioVisto: await docInternaUsuarioVisto(usuario, false, db)});
}

/*export async function envNotiDocInternaUsuarioVisto(pubSub: any, usuario: string, db: any) {
 await pubSub.publish(subscripciones.NOT_DOC_INTERNA, {payload: usuario})
 }*/
