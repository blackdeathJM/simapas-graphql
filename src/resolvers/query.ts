import {IResolvers} from "graphql-tools";
import {obtenerDeptos} from "../operaciones/querys/departamento.query";
import {loginUsuario, obtenerTodosLosUsuarios, perfilUsuario} from "../operaciones/querys/usuarios.query";

const query: IResolvers =
    {
        Query:
            {
                // ==================================DEPARTAMENTOS==============================================
                async departamentos(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerDeptos(db);
                },
                // ==================================FIN DEPARTAMENTOS==========================================

                // =================================USUARIOS====================================================
                async usuarios(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerTodosLosUsuarios(db);
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
export default query;
