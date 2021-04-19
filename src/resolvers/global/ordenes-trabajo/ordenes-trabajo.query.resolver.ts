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
                async ordenesTrabEstatus(_, {departamentoId, estatus, esAdmin}, {db})
                {
                    return new OrdenesTrabajoQueryService(_, {}, {db})._ordenesTrabEstatus(departamentoId, estatus, esAdmin);
                },
                async ordenesPorDepto(_, {departamentoId}, {db})
                {
                    return new OrdenesTrabajoQueryService(_, {}, {db})._ordenesPorDepto(departamentoId);
                },
                async porCriterio(_, {consulta}, {db})
                {
                    return new OrdenesTrabajoQueryService(_, {}, {db})._porCriterio(consulta);
                },
                async porFechas(_, {fechaInicial, fechaFinal}, {db})
                {
                    return new OrdenesTrabajoQueryService(_, {}, {db})._porFechas(fechaInicial, fechaFinal);
                }
            }
    }
