import {IResolvers} from "graphql-tools";
import DocExtQueryService from "./services/docExt-query.service";

const queryDocExt: IResolvers =
    {
        Query:
            {
                async todosDocsExt(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._todosDocsExt(proceso);
                },
                // consultar documentos por usuarios sera usado por el admistrador
                async todosLosDocsPorUsuario(_, {usuario}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._todosLosDocsPorUsuario(usuario);
                },
                // Consultar documento que sera enviado al usuarios el subproceso es un array
                async usuarioSubproceso(_, {usuario, subprocesos}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._doscUsuarioSubproceso(usuario, subprocesos);
                },
                async docsAprobadosPorUsuario(_, {usuario, subproceso, pagina, elementosPorPagina}, {db})
                {
                    return new DocExtQueryService(_, {usuario, subproceso, paginacion: {pagina, elementosPorPagina}}, {db})._docsAprobadosUsuario();
                },
                async docExtProceso(_, {proceso}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._docExtProceso(proceso);
                },
                docsEntreFechas(_, {fechaRecepcionInicial, fechaRecepcionFinal}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._busquedaEntreFechas(fechaRecepcionInicial, fechaRecepcionFinal);
                },
                busquedaGral(_, {consulta}, {db})
                {
                    return new DocExtQueryService(_, {}, {db})._busquedaGral(consulta);
                }
            }
    };
export default queryDocExt;
