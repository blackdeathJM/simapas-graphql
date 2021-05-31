import {IResolvers} from "graphql-tools";
import {ClienteQueryService} from "../services/cliente.query.service";

export const queryCliente: IResolvers =
    {
        Query:
            {
                async clientesPorCriterio(_, {criterio}, {db})
                {
                    return new ClienteQueryService(_, {db})._clientesPorCriterio(criterio);
                },
                async datosRef(_, {noMedidor}, {db})
                {
                    return new ClienteQueryService(_, {db})._datosRef(noMedidor);
                }
            }
    }
