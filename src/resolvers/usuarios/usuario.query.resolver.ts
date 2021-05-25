import {IResolvers} from "graphql-tools";
import UsuarioQueryService from "./services/usuario-query.service";

const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_, {}, {db})
                {
                    return new UsuarioQueryService(_, {db})._listarUsuarios();
                },
                async buscarUsuario(_, {usuario}, {db})
                {
                    return new UsuarioQueryService(_, {db})._buscarUsuario(usuario);
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    return new UsuarioQueryService(_, {db})._login(usuario, contrasena);
                },
            }
    };
export default queryUsuarios;
