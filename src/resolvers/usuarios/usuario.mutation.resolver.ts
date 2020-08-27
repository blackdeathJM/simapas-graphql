import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import {PubSub} from "apollo-server-express";
import {COLECCION, PUB_SUB} from "../../config/global";
import {ObjectId} from "bson";
import {obtenerUsuario} from "./usuario.query.resolver";
import {Db} from "mongodb";

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
                async actualizarRole(_: void, {_id, role}, {db})
                {
                    const database = db as Db;
                    return await database.collection(COLECCION.USUARIOS).findOneAndUpdate({_id: new ObjectId(_id)},
                        {$set: {role}}, {returnOriginal: false}).then(
                        async (respuesta: any) =>
                        {
                            return {
                                estatus: true,
                                mensaje: 'Se ha modificado con exito el rol del usuario',
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
                    // let infoToken = new JWT().verificar(token);
                    // console.log(infoToken);
                    console.log('Contrasenas recibidas', actualContrasena, nvaContrasena);
                    return true;

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
                            return {
                                estatus: true,
                                mensaje: 'La imagen del usuario se ha cambiado con exito',
                                usuario: usuario.value
                            }
                        }
                    ).catch(
                        async (error) =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de actualizar la imagen de perfil: ' + error,
                                usuario: null
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
                                mensaje: 'El usuario fue eliminado con exito',
                                usuario: null
                            }
                        }
                    ).catch(
                        async () =>
                        {
                            return {
                                estatus: false,
                                mensaje: 'Ocurrio un error al tratar de eliminar el usuario',
                                usuario: null
                            }
                        }
                    )
                }
            }
    };
export default mutationUsuarios;
