import {IResolvers} from "graphql-tools";
import OrdenTrabajoQueryService from "./service/orden-trabajo-query-service";

const queryOrdenTrabajo: IResolvers =
    {
        Query:
            {
                async todasOrdenes(_, {}, {db})
                {
                    return new OrdenTrabajoQueryService(_, {}, {db})._todasOrdenes();
                },
                async ordenesPenTerm(_, {estatus, deptoID}, {db})
                {
                    return new OrdenTrabajoQueryService(_, {}, {db})._ordenesPenTerm(estatus, deptoID);
                }
            }
    };
export default queryOrdenTrabajo;
