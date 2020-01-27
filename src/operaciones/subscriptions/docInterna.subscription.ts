import {docInternaUsuarioVisto} from "../querys/docInterna.query";

export async function enviarNotificacionDocInterna(pubsub: any, usuario: string, visto: boolean, db: any) {
    await pubsub.publish('cambioDocInterna', {cambioDocInterna: await docInternaUsuarioVisto(usuario, visto, db)});
}
