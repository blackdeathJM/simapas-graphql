import {IResolvers} from "graphql-tools";
import {obtenerDeptoID, obtenerDeptos} from "../operaciones/querys/departamento.query";
import {loginUsuario, obtenerTodosLosUsuarios, perfilUsuario,} from "../operaciones/querys/usuarios.query";

const query: IResolvers =
    {
        Query:
            {
                async departamentos(_: void, __: any, {db}): Promise<any>
                {
                    return await obtenerDeptos(db)
                },
                async departamentoID(_: void, {nombre}, {db}): Promise<any>
                {
                    console.log('dentro de la funcion', nombre);
                    return await obtenerDeptoID(nombre, db);
                },
                async usuarios(_: void, __: any, {db})
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
            }
    };
export default query;
