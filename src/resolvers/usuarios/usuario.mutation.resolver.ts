import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_: void, {usuario}, {db})
                {
                    const checharUsuario = await db.collection('usuarios').findOne({usuario: usuario.usuario});
                    if (checharUsuario !== null) {
                        return {
                            estatus: false,
                            mensaje: `El usuario ${usuario.usuario} ya existe`,
                            usuario: null
                        }
                    }
                    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
                    return await db.collection('usuarios').insertOne(usuario).then(
                        async () =>
                        {
                            // aqui ponemos la subcripcion si se requiere
                            return {
                                estatus: true,
                                mensaje: 'Datos agregados con exito',
                                usuario
                            };
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Usuario no se puede registrar',
                                usuario: null
                            }
                        }
                    )
                },
                async actualizarUsuario(_: void, {usuario}, {db})
                {
                    return await db.collection('usuarios').findOneAndUpdate(
                        {usuario},
                        {$set: {nombre: usuario.nombre, img: usuario.img}}
                    ).then(
                        async () =>
                        {
                            return {
                                estatus: true,
                                mensaje: 'Datos actualizados de manera correcta'
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            {
                                return {
                                    estatus: false,
                                    mensaje: 'Error al intentar actualizar el perfil de este usuario',
                                    usuario: null
                                }
                            }
                        }
                    );
                },
            }
    };
export default mutationUsuarios;
