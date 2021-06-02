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
                async aprovRechSolicitud(_, {_id, valor}, {db})
                {
                    return new SolicitudesMutationService(_, {db})._aprovRechSolicitud(_id, valor);
                }

            }
    }
