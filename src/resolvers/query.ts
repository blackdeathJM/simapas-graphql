import {IResolvers} from "graphql-tools";
import {buscarDeptoID, obtenerDeptos} from "../operaciones/querys/departamento.query";
import {
    loginUsuario,
    obtenerNombreDeptoAsignado,
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorSuNombreDeUsuario,
    perfilUsuario,
} from "../operaciones/querys/usuarios.query";
import {ultimoFolio} from "../operaciones/querys/folio.query";

const query: IResolvers =
    {
        INodo:
            {
                __resolveType: (obj: any, context: any, info: string) =>
                {
                    console.log('========', obj);
                    if (obj.usuario)
                    {
                        console.log('????????????', obj.usuario);
                        return 'Usuario'
                    }
                    if (obj.nombre)
                    {
                        console.log('++++++++++++', obj.nombre);
                        return 'Departamento'
                    }
                    return null
                }
            },
        Query:
            {
                async obtenerDepartamentos(_: void, __: any, {db})
                {
                    return await obtenerDeptos(db)
                },
                async departamentoID(_: void, {_id}: any, {db})
                {
                    return await buscarDeptoID(_id, db);
                },
                async obtenerUsuarios(_: void, __: any, {db})
                {
                    return await obtenerTodosLosUsuarios(db);
                },
                async buscarUsuario(_: any, {usuario}, {db})
                {
                    return await obtenerUsuarioPorSuNombreDeUsuario(usuario, db);
                },
                async buscarUsuarioDepartamento(_: any, {id}, {db})
                {
                    return await obtenerNombreDeptoAsignado(id, db);
                },
                async login(_: void, {usuario, contrasena}, {db})
                {
                    return await loginUsuario(usuario, contrasena, db)
                },
                async perfil(_: void, __: any, {token})
                {
                    return perfilUsuario(token);
                },
                async buscarUltimoFolio(_: any, {numFolio}, {db})
                {
                    return await ultimoFolio(numFolio, db);
                }
            },
    };
export default query;
