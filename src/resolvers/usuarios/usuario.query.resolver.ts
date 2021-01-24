import {IResolvers} from "graphql-tools";
import UsuarioQueryService from "./services/usuario-query.service";

const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_, {pagina, elementosPorPagina}, {db})
                {
                    return new UsuarioQueryService(_, {paginacion: {pagina, elementosPorPagina}}, {db}).listarUsuarios();
                },
                async buscarUsuario(_, {usuario}, {db})
                {
                    return new UsuarioQueryService(_, {usuario}, {db}).buscarUno();
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    return new UsuarioQueryService(_, {}, {db})._login(usuario, contrasena);
                },
            }
    };
export default queryUsuarios;
