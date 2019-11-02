import {IResolvers} from "graphql-tools";
import bcryptjs from 'bcryptjs';

const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {db}): Promise<any>
                {
                    return await db.collection('departamentos').insertOne(departamento).then(() =>
                    {
                        return {
                            estatus: true,
                            mensaje: `El departamento ${departamento.nombre} se registro de manera correcta`,
                            departamento
                        }
                    }).catch((err: any) =>
                    {
                        return {
                            estatus: false,
                            mensaje: `Error al intentar registrar el departamento: ${err}`,
                            departamento: null
                        }
                    });
                },

                async registroUsuario(_: void, {usuario}, {db}): Promise<any>
                {
                    const checharUsuario = await db.collection('usuarios').findOne({usuario: usuario.usuario});
                    if (checharUsuario !== null)
                    {
                        return {
                            estatus: false,
                            mensaje: `El usuario ${usuario.usuario} ya existe`,
                            usuario: null
                        }
                    }
                    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
                    return await db.collection('usuarios').insertOne(usuario).then(() =>
                    {
                        return {
                            estatus: true,
                            mensaje: 'Datos agregados con exito',
                            usuario
                        };
                    }).catch(() =>
                    {
                        return {
                            estatus: false,
                            mensaje: 'Usuario no se puedo registrar',
                            usuario: null
                        }
                    });
                }

            }
    };
export default mutation;
