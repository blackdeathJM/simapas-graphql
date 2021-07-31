// import {IResolvers} from "graphql-tools";
import {ClienteMutationService} from "../services/cliente.mutation.service";
import {ContratoMutationService} from "../services/contrato.mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";

export const mutationCliente: IResolvers =
    {
        Mutation:
            {
                // ================ CLIENTES ================================
                async regCliente(_, {cliente}, {db})
                {
                    return new ClienteMutationService(_,  {db})._regCliente(cliente);
                },
                // ==============CONTRATOS=====================================
                async regContrato(_, {idCliente, contrato, idSolicitud}, {db, tr})
                {
                    return new ContratoMutationService(_,  {db})._regContrato(idCliente, contrato, idSolicitud, tr);
                }
            }
    }

