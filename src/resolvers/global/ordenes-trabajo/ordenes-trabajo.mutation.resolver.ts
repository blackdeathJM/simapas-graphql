import {IResolvers} from "graphql-tools";
import {OrdenesTrabajoMutationService} from "./services/ordenes-trabajo.mutation.service";

export const mutationOrdenTrabajo: IResolvers =
    {
        Mutation:
            {
                async regOrdenTrabajo(_, {ordenTrabajo}, {db})
                {
                    return new OrdenesTrabajoMutationService(_, {db})._regOrdenTrabajo(ordenTrabajo)
                }
            }
    }
