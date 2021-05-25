import {IResolvers} from "graphql-tools";
import {NotificacionQueryService} from "./services/notificacion.query.service";

const queryNotificacion: IResolvers =
    {
        Query:
            {
                async listarNotificaciones(_, {receptor}, {db})
                {
                    return new NotificacionQueryService(_, {db})._listarNotificaciones(receptor);
                }
            }
    }
export default queryNotificacion
