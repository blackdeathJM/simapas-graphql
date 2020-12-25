import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query.service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                // Obtenermos todos los documentos externos
                async todosDocsExt(_, {pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db})._docExtLista().then((res) =>
                    {
                        return res;
                    });
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {paginacion: {pagina, elementosPorPagina}, usuario: usuario}, {db})._todosLosDocsPorUsuario();
                },
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subprocesos, paginacion: {pagina, elementosPorPagina}}, {db})._doscUsuarioSubproceso();
                },
                async docsAprobadosPorUsuario(_, {usuario, subproceso, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subproceso, paginacion: {pagina, elementosPorPagina}}, {db})._docsAprobadosUsuario();
                },
                async docExtProceso(_, {proceso, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {proceso, paginacion: {pagina, elementosPorPagina}}, {db})._docExtProceso();
                },
                docsEntreFechas(_, {fechaRecepcionInicial, fechaRecepcionFinal, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {fechaRecepcionInicial, fechaRecepcionFinal, paginacion: {pagina, elementosPorPagina}},
                        {db})._busquedaEntreFechas();
                },
                busquedaGral(_, {consulta, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {consulta, paginacion: {pagina, elementosPorPagina}}, {db})._consultaGral();
                }
            }
    };
export default queryDocExt;
