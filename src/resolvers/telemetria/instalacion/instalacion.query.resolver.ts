import {IResolvers} from "graphql-tools";
import InstalacionQueryServices from "./services/instalacion.query.services";

const queryTelemetria: IResolvers =
    {
        Query:
            {
                async todasInstalaciones(_, {pagina, elementosPorPagina}, {db})
                {
                    return new InstalacionQueryServices(_, {paginacion: {pagina, elementosPorPagina}}, {db})._todasInstalaciones();
                }
            }
    }
export default queryTelemetria;
