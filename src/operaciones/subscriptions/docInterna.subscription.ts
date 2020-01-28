import {todasNotificacionesDocInterna} from "../querys/docInterna.query";

export async function enviarNotificacionDocInterna(pubsub: any, db: any)
{
    await pubsub.publish('cambioDocInterna', {cambioDocInterna: await todasNotificacionesDocInterna(db)});
}
