// import {IResolvers} from "graphql-tools";
import {ClienteQueryService} from "../services/cliente.query.service";
import {IResolvers} from "graphql-middleware/dist/types";

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
