import {IResolvers} from "graphql-tools";
import {buscarDeptoID, obtenerDeptos} from "../operaciones/querys/departamento.query";
import {
    loginUsuario,
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorSuNombreDeUsuario,
    perfilUsuario,
} from "../operaciones/querys/usuarios.query";

const query: IResolvers =
    {
        Query:
            {
                async departamentos(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerDeptos(db)
                },
                async departamentoID(_: void, _id: any, {db}): Promise<any>
                {
                    return await buscarDeptoID(_id, db);
                },
                async usuarios(_: void, __: any, {db})
                {
                    return await obtenerTodosLosUsuarios(db);
                },
                async buscarUsuario(_: any, usuario: string, db: any)
                {
                    return await obtenerUsuarioPorSuNombreDeUsuario(usuario, db);
                },
                async login(_: void, {usuario, contrasena}, {db}): Promise<any>
                {
                    return await loginUsuario(usuario, contrasena, db)
                },
                perfil(_: void, __: any, {token})
                {
                    return perfilUsuario(token);
                }
            }
    };
export default query;
