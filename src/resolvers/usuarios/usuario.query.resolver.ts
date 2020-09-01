import {IResolvers} from "graphql-tools";
import UsuarioQueryService from "./services/usuario-query-service";

const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_, __, {db})
                {
                    return new UsuarioQueryService(_, __, {db}).listarUsuarios();
                },
                async buscarUsuario(_, {usuario}, {db})
                {
                    return new UsuarioQueryService(_, {usuario}, {db}).buscarUno();
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    return new UsuarioQueryService(_, {usuario: usuario, contrasena: contrasena}, {db}).loginUsuario();
                },
            }
    };
export default queryUsuarios;
