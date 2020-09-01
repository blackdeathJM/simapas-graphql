import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import {PubSub} from "apollo-server-express";
import {COLECCION, PUB_SUB} from "../../config/global";
import {ObjectId} from "bson";
import {obtenerUsuario} from "./usuario.query.resolver";
import {Db} from "mongodb";
import JWT from "../../lib/jwt";

async function notSessionUsuario(usuario: string, pubsub: PubSub, db: Db)
{
    await pubsub.publish(PUB_SUB.NOT_USUARIOS_SESSION, {sessionUsuario: obtenerUsuario(usuario, db)});
}

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_: void, {usuario}, {db})
                {
                    const database = db as Db;
                    const checharUsuario = await database.collection(COLECCION.USUARIOS).findOne({usuario: usuario.usuario});
                    if (checharUsuario !== null)
                    {
                        return {
                            estatus: false,
                            mensaje: `El usuario ${usuario.usuario} ya existe`,
                            usuario: null
                        }
                    }
                    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
                    return await database.collection(COLECCION.USUARIOS).insertOne(usuario).then(
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

                async actualizarRole(_: void, {_id, role}, {pubsub, db})
                {
                    const database = db as Db;
                    return await database.collection(COLECCION.USUARIOS).findOneAndUpdate({_id: new ObjectId(_id)},
                        {$set: {role}}, {returnOriginal: false}).then(
                        async (respuesta: any) =>
                        {
                            console.log('actualizar role', respuesta.value);

                            delete respuesta.value.contrasena;
                            respuesta.value.contrasena = '*******';
                            const nvoTokenRole = respuesta.value;
                            const subscripcion = pubsub as PubSub;

                            await subscripcion.publish(PUB_SUB.NOT_CAMBIO_ROLE, {cambiarRoleUsuario: new JWT().firmar(nvoTokenRole)});

                            return {
                                estatus: true,
                                mensaje: 'Se ha modificado con exito el rol del usuarios',
                                usuario: respuesta.value
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de modificar roles',
                                usuario: null
                            }
                        }
                    )
                },

                async actualizarContrasena(_void, {usuario, actualContrasena, nvaContrasena}, {db})
                {
                    const baseDatos = db as Db;
                    // buscar el usuarios
                    return await baseDatos.collection(COLECCION.USUARIOS).findOne({usuario}).then(
                        async (respuesta) =>
                        {
                            if (respuesta.usuario)
                            {
                                if (bcryptjs.compareSync(actualContrasena, respuesta.contrasena))
                                {
                                    respuesta.contrasena = bcryptjs.hashSync(nvaContrasena, 10);
                                    return await baseDatos.collection(COLECCION.USUARIOS).findOneAndUpdate(
                                        {usuario},
                                        {$set: {contrasena: respuesta.contrasena}},
                                        {returnOriginal: false}).then(
                                        async (contrasenaCambiada) =>
                                        {
                                            delete contrasenaCambiada.value.contrasena;
                                            const nvaContrasena = contrasenaCambiada.value
                                            return {
                                                estatus: true,
                                                mensaje: 'La contrasena se ha cambiado con exito',
                                                token: new JWT().firmar({nvaContrasena})
                                            }
                                        }
                                    ).catch(
                                        async (error) =>
                                        {
                                            return {
                                                estatus: false,
                                                mensaje: 'Ocurrio un error al tratar de actualizar la contrasena' + error,
                                                token: null
                                            }
                                        }
                                    )
                                } else
                                {
                                    return {
                                        estatus: false,
                                        mensaje: 'Tu contrasena actual no coincide con la que esta registrada',
                                        token: null
                                    }
                                }
                            }
                        }
                    ).catch(
                        async (error) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error inseperado' + error,
                                token: null
                            }
                        }
                    )
                },

                async actualizarImgPerfil(_: void, {usuario, img}, {db})
                {
                    const baseDatos = db as Db;
                    return await baseDatos.collection(COLECCION.USUARIOS).findOneAndUpdate(
                        {usuario},
                        {$set: {img}},
                        {returnOriginal: false}).then(
                        async (usuario) =>
                        {
                            const usuarioPerfil = usuario.value;
                            delete usuarioPerfil.contrasena;
                            return {
                                estatus: true,
                                mensaje: 'La imagen del usuarios se ha cambiado con exito',
                                token: new JWT().firmar(usuarioPerfil)
                            }
                        }
                    ).catch(
                        async (error) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de actualizar la imagen de perfil: ' + error,
                                token: null
                            }
                        }
                    )
                },

                async eliminarUsuario(_: void, {_id}, {pubsub, db})
                {
                    const database = db as Db;
                    return await database.collection(COLECCION.USUARIOS).findOneAndDelete({_id: new ObjectId(_id)}).then(
                        async () =>
                        {
                            await notSessionUsuario(_id, pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El usuarios fue eliminado con exito',
                                usuario: null
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al tratar de eliminar el usuarios',
                                usuario: null
                            }
                        }
                    )
                }
            }
    };
export default mutationUsuarios;
