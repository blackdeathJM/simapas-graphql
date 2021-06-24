import {IResolvers} from "graphql-tools";
import {SolicitudesMutationService} from "../services/solicitudes.mutation.service";

export const mutationColeIndividuales: IResolvers =
    {
        Mutation:
            {
                async regSolicitudServ(_, {solicitudServ}, {db})
                {
                    return new SolicitudesMutationService(_, {db})._regSolicitudServ(solicitudServ);
                },
                async realizarPago(_, {_id, valor}, {db})
                {
                    return new SolicitudesMutationService(_, {db})._realizarPago(_id, valor);
                },
                async actualizarSolicitud(_, {_id, observaciones, aprobadoServ, ejecutadaPor}, {db})
                {
                    return new SolicitudesMutationService(_, {db})._actualizarSolicitud(_id, observaciones, aprobadoServ, ejecutadaPor);
                }
            }
    }
