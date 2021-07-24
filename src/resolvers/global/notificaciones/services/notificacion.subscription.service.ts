import {PubSub} from 'graphql-subscriptions';
import {Db} from "mongodb";
import {NotificacionQueryService} from "./notificacion.query.service";
import {PUB_SUB} from "../../../../config/global";

export async function notNotificacion(pubsub: PubSub, db: Db, usuarios: string[])
{
    return usuarios.filter(async receptor =>
    {
        return await new NotificacionQueryService({}, {db})._listarNotificaciones(receptor).then(
            async resultado =>
            {
                return await pubsub.publish(PUB_SUB.NOT_NOTIFICACION, {notificar: resultado.documentos})
            })
    })
}
