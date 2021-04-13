import {IResolvers} from "graphql-tools";
import {OrdenesTrabajoMutationService} from "./services/ordenes-trabajo.mutation.service";

export const mutationOrdenTrabajo: IResolvers =
    {
        Mutation:
            {
                async regOrdenTele(_, {ordenTele}, {db})
                {
                    return new OrdenesTrabajoMutationService(_, {}, {db})._regOrdenTele(ordenTele)
                }
            }
    }
