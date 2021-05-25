import {IResolvers} from "graphql-tools";
import {ColeIndividualesMutationService} from "../services/coleIndividuales.mutation.service";

export const mutationColeIndividuales: IResolvers =
    {
        Mutation:
            {
                async regSolicitudServ(_, {solicitudServ}, {db})
                {
                    return new ColeIndividualesMutationService(_, {db})._regSolicitudServ(solicitudServ);
                }
            }
    }
