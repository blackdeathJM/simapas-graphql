import {IResolvers} from "graphql-tools";
import DepartamentoQueryService from "./services/departamento-query.service";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, {pagina, elementosPorPagina}, {db})
                {
                    return new DepartamentoQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoQueryService(_, {_id}, {db}).elementoDetalle();
                }
            }
    };
export default queryDeptos;
