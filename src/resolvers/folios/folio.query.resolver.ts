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
                }
            }
    };
export default queryFolios;
