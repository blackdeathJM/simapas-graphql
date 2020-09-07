import {IResolvers} from "graphql-tools";
import DepartamentoQueryServices from "./services/departamento-query.services";

const queryDeptos: IResolvers =
    {
        Query:
            {
                async obtenerDeptos(_, {pagina, elementosPorPagina}, {db})
                {
                    return new DepartamentoQueryServices(_, {paginacion: {pagina, elementosPorPagina}}, {db}).listaElementos();
                },
                async departamentoID(_, {_id}, {db})
                {
                    return new DepartamentoQueryServices(_, {_id}, {db}).elementoDetalle();
                }
            }
    };
export default queryDeptos;
