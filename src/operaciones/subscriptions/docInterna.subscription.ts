import {SUBSCRIPCIONES} from "../../config/constants";
import {docInternaUsuarioVisto} from "../querys/docInterna.query";


/*export async function notDocInternaUsuarioVisto(nvaNotificacion: any, pubsub: any, db: any)
 {
 await pubsub.publish(SUBSCRIPCIONES.NEW_DOC_INTERNA, {nvaNotInterna: nvaNotificacion});
 }*/
export async function notDocInternaUsuarioVisto(usuario: string, visto: boolean, pubsub: any, db: any)
{
    await pubsub.publish(SUBSCRIPCIONES.NEW_DOC_INTERNA, {nvaNotInterna: docInternaUsuarioVisto(usuario, visto, db)});
}
