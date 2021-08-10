// import {IResolvers} from "graphql-tools";
import {IResolvers} from "graphql-middleware/dist/types";
import {UsuarioQueryService} from "./services/usuario-query.service";

export const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_, {}, {db})
                {
                    return new UsuarioQueryService(_, {db})._obtenerUsuarios();
                },
                async obtenerUsuario(_, {_id}, {db})
                {
                    return new UsuarioQueryService(_, {db})._obtenerUsuario(_id);
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    return new UsuarioQueryService(_, {db})._login(usuario, contrasena);
                },
            }
    };
