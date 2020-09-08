import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query-service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                // Obtenermos todos los documentos externos
                async todosDocsExt(_, {pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db}).docExtLista();
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {paginacion: {pagina, elementosPorPagina}, usuario: usuario},
                        {db}).docExtListaPorUsuario();
                },
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subprocesos, paginacion: {pagina, elementosPorPagina}},
                        {db}).doscUsuarioSubproceso();
                },
                async docsAprobadosPorUsuario(_, {usuario, subproceso, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subproceso, paginacion: {pagina, elementosPorPagina}},
                        {db}).docsAprobadosUsuario();
                }
            }
    };
export default queryDocExt;
