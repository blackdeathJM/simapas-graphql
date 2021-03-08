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
                async reciboCfeDuplicado(_, {_id, ano, mes, medidor}, {db})
                {
                    return new InstalacionQueryService(_, {_id}, {db})._reciboCfeDuplicado(ano, mes, medidor);
                },
                async todosRecibosCfe(_, {_id, medidor}, {db})
                {
                    return new InstalacionQueryService(_, {_id}, {db})._todosRecibosCfe(medidor);
                }
            }
    }
export default queryTelemetria;
