import {IResolvers} from "graphql-tools";
import {ClienteQueryService} from "../services/cliente.query.service";

export const queryCliente: IResolvers =
    {
        Query:
            {
                clientesPorCriterio(_, {criterio}, {db})
                {
                    return new ClienteQueryService(_, {db})._clientesPorCriterio(criterio);
                }
            }
    }
