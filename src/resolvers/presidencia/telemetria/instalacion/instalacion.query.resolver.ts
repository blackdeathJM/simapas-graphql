// import {IResolvers} from "graphql-tools";
import InstalacionQueryService from "./services/instalacion.query.service";
import {CfeQueryService} from "./services/cfe.query.service";
import {IResolvers} from "graphql-middleware/dist/types";

const queryTelemetria: IResolvers =
    {
        Query:
            {
                async todasInstalaciones(_, {pagina, elementosPorPagina}, {db})
                {
                    return new InstalacionQueryService(_, {db})._todasInstalaciones();
                },
                async recibosCfePorAno(_, {_id, medidor, ano}, {db})
                {
                    return new CfeQueryService(_, {db})._recibosCfePorAno(_id, medidor, ano);
                }
            }
    }
export default queryTelemetria;
