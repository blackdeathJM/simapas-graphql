import {IResolvers} from "graphql-tools";
import {ClienteMutationService} from "../services/cliente.mutation.service";

export const mutationCliente: IResolvers =
    {
        Mutation:
            {
                regCliente(_, {cliente}, {db})
                {
                    return new ClienteMutationService(_, {}, {db})._regCliente(cliente);
                },
                regContrato(_, {idCliente, contrato}, {db})
                {
                    return new ClienteMutationService(_, {}, {db})._regContrato(idCliente, contrato);
                }
            }
    }

