import {IResolvers} from "graphql-tools";
import InstalacionQueryService from "./services/instalacion.query.service";

const queryTelemetria: IResolvers =
    {
        Query:
            {
                async todasInstalaciones(_, {pagina, elementosPorPagina}, {db})
                {
                    return new InstalacionQueryService(_, {}, {db})._todasInstalaciones();
                },
                async ipDuplicada(_, {telemetria}, {db})
                {
                    return new InstalacionQueryService(_, {telemetria}, {db})._ipDuplicada();
                }
            }
    }
export default queryTelemetria;
