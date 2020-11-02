import {IResolvers} from "graphql-middleware/dist/types";
import ClienteMutationService from "./services/cliente-mutation-service";

const mutationClientes: IResolvers =
    {
        Mutation:
            {
                async regCliente(_, {cliente}, {db})
                {
                    return new ClienteMutationService(_, {}, {db})._regCliente(cliente);
                }
            }
    };
export default mutationClientes;
