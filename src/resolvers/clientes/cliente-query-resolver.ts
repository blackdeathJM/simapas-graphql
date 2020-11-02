import {IResolvers} from "graphql-tools";
import ClienteQueryService from "./services/cliente-query-service";

const queryCliente: IResolvers =
    {
        Query:
            {
                async todosClientes(_, {pagina, elementosPorPagina}, {db})
                {
                    return new ClienteQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db})._todosCliente();
                }
            }
    };
export default queryCliente
