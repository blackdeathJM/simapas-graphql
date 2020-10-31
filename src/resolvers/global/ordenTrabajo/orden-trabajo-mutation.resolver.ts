import {IResolvers} from "graphql-tools";
import OrdenTrabajoMutationService from "./service/orden-trabajo-mutation-service";

const mutationOrdenTrabajo: IResolvers =
    {
        Mutation:
            {
                async regOrdenTrabajo(_, {ordenTrabajo}, {db})
                {
                    return new OrdenTrabajoMutationService(_, {}, {db})._regOrdenTrabajo(ordenTrabajo);
                }
            }
    };
export default mutationOrdenTrabajo;
