import {IResolvers} from "graphql-tools";
import {SolicitudesMutationService} from "../services/solicitudes.mutation.service";

export const mutationColeIndividuales: IResolvers =
    {
        Mutation:
            {
                async regSolicitudServ(_, {solicitudServ}, {db})
                {
                    return new SolicitudesMutationService(_, {db})._regSolicitudServ(solicitudServ);
                }
            }
    }
