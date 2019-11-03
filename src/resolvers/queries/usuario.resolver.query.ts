import {IResolvers} from "graphql-tools";
import {loginUsuario, obtenerTodosLosUsuarios, perfilUsuario} from "../../operaciones/querys/usuarios.query";

const queryUsuario: IResolvers =
    {
        Query:
            {
                async usuarios(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerTodosLosUsuarios(db)
                },
                async login(_: void, {usuario, contrasena}, {db}): Promise<any>
                {
                    return await loginUsuario(usuario, contrasena, db)
                },
                perfil(_: void, __: any, {token})
                {
                    return perfilUsuario(token);
                }
                // ====================================FIN USUARIOS=============================================
            }
    };
export default queryUsuario;
