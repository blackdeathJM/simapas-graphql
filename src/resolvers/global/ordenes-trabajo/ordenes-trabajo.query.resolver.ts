import {IResolvers} from "graphql-tools";
import {OrdenesTrabajoQueryService} from "./services/ordenes-trabajo.query.service";

export const queryOrdenesTrabajo: IResolvers =
    {
        Query:
            {
                async todasOrdenes(_, __, {db})
                {
                    return new OrdenesTrabajoQueryService(_, __, {db}).todasOrdenes();
                },
                async ordenesTrabEstatus(_, {departamentoId, estatus}, {db})
                {
                    return new OrdenesTrabajoQueryService(_, {}, {db})._ordenesTrabEstatus(departamentoId, estatus)
                }
            }
    }
