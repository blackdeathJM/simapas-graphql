import {IResolvers} from "graphql-tools";
import {NotificacionMutationService} from "./services/notificacion.mutation.service";

const mutationNotificacion: IResolvers =
    {
        Mutation:
            {
                async regNotificacion(_, {notificacion}, {pubsub, db})
                {
                    return new NotificacionMutationService(_,  {pubsub, db})._regNotificacion(notificacion);
                },
                async eliminarNotificacion(_, {_id}, {db})
                {
                    return new NotificacionMutationService(_,  {db})._eliminarNotificacion(_id);
                }
            }
    }
export default mutationNotificacion;
