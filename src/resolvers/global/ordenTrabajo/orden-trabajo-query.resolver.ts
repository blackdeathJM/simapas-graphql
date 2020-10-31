import {IResolvers} from "graphql-tools";
import OrdenTrabajoQueryService from "./service/orden-trabajo-query-service";

const queryOrdenTrabajo: IResolvers =
    {
        Query:
            {
                async todasOrdenes(_, {pagina, elemetosPorPagina}, {db})
                {
                    return new OrdenTrabajoQueryService(_, {paginacion: {pagina, elemetosPorPagina}}, {db})._todasOrdenes();
                }
            }
    };
export default queryOrdenTrabajo;
