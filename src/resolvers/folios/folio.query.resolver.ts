import {IResolvers} from "graphql-tools";
import FolioQueryService from "./services/folio.query.service";

const queryFolios: IResolvers =
    {
        Query:
            {
                async obtenerFoliosTodos(_, {pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db})._obtenerFolios();
                },
                async ultimoFolio(_, __, {db})
                {
                    return new FolioQueryService(_, __, {db})._ultimoFolioRegistrado();
                },
                async folioUsuario(_, {asigUsuario, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {asigUsuario, paginacion: {pagina, elementosPorPagina}}, {db})._folioUsuario();
                },
                async folUsuarioProceso(_, {asigUsuario, proceso, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {asigUsuario, proceso, paginacion: {pagina, elementosPorPagina}},
                        {db})._folUsuarioProceso();
                },
                async folEntreFechasUsuario(_, {inicial, final, asigUsuario, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {inicial, final, asigUsuario, paginacion: {pagina, elementosPorPagina}}, {db})._folEntreFechasUsuario();
                },
                async folConsultaGralUsuario(_, {consulta, asigUsuario, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {consulta, asigUsuario, paginacion: {pagina, elementosPorPagina}}, {db})._folConsultaGralUsuario();
                },
                async folEntreFechas(_, {inicial, final, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {inicial, final, paginacion: {pagina, elementosPorPagina}}, {db})._folEntreFechas();
                },
                folConsultaGral(_, {consulta, pagina, elementosPorPagina}, {db})
                {
                    return new FolioQueryService(_, {consulta, paginacion: {pagina, elementosPorPagina}}, {db})._folConsultaGral();
                }
            }
    };
export default queryFolios;
