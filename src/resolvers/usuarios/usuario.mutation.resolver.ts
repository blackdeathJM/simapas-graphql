import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import {PubSub} from "apollo-server-express";
import {ENTIDAD_DB, PUB_SUB} from "../../config/global";
import {ObjectId} from "bson";
import {obtenerUsuario} from "./usuario.query.resolver";
import JWT from "../../lib/jwt";
import {Db} from "mongodb";

async function notSessionUsuario(usuario: string, pubsub: PubSub, db: Db) {
    await pubsub.publish(PUB_SUB.NOT_USUARIOS_SESSION, {sessionUsuario: obtenerUsuario(usuario, db)});
}

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_: void, {usuario}, {db}) {
                    const database = db as Db;
                    const checharUsuario = await database.collection(ENTIDAD_DB.USUARIOS).findOne({usuario: usuario.usuario});
                    if (checharUsuario !== null) {
                        return {
                            estatus: false,
                            mensaje: `El usuario ${usuario.usuario} ya existe`,
                            usuario: null
                        }
                    }
                    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
                    return await database.collection(ENTIDAD_DB.USUARIOS).insertOne(usuario).then(
                        async () => {
                            // aqui ponemos la subcripcion si se requiere
                            return {
                                estatus: true,
                                mensaje: 'Datos agregados con exito',
                                usuario
                            };
                        }
                    ).catch(
                        async () => {
                            return {
                                estatus: false,
                                mensaje: 'Usuario no se puede registrar',
                                usuario: null
                            }
                        }
                    )
                },
                async actualizarUsuario(_: void, {usuario}, {pubsub, db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.USUARIOS).findOneAndUpdate(
                        {usuario},
                        {$set: {nombre: usuario.nombre, img: usuario.img}}
                    ).then(
                        async () => {
                            await notSessionUsuario(usuario._id, pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'Datos actualizados de manera correcta'
                            }
                        }
                    ).catch(
                        async () => {
                            {
                                return {
                                    estatus: false,
                                    mensaje: 'Error al intentar actualizar el per de este usuario',
                                    usuario: null
                                }
                            }
                        }
                    );
                },
                async actualizarRole(_: void, {_id, role}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.USUARIOS).findOneAndUpdate({_id: new ObjectId(_id)},
                        {$set: {role}}, {returnOriginal: false}).then(
                        async (respuesta: any) => {
                            return {
                                estatus: true,
                                mensaje: 'Se ha modificado con exito el rol del usuario',
                                usuario: respuesta.value
                            }
                        }
                    ).catch(
                        async () => {
                            return {
                                estatus: false,
                                mensaje: 'Error al tratar de modificar roles',
                                usuario: null
                            }
                        }
                    )
                },
                async actualizarContrasena(_void, {_id, contrasena}, {token, db}) {
                    const database = db as Db;

                    let infoToken = new JWT().verificar(token);
                    console.log('validacion token', infoToken);
                    if (infoToken) {
                        return {
                            estatus: false,
                            mensaje: infoToken,
                            usuario: null
                        }
                    } else {
                        const nvaContrasena = bcryptjs.hashSync(contrasena, 10);
                        console.log('nueva contrasena', nvaContrasena);
                        /*                        return await db.collection(ENTIDAD_DB.USUARIOS).findOneAndUpdate(
                                                    {_id: new ObjectId(_id)},
                                                    {$set: {contrasena: nvaContrasena}}
                                                ).then(
                                                    async () => {
                                                        return {
                                                            status: true,
                                                            mensaje: 'La contrasena fue modificada con exito'
                                                        }
                                                    }
                                                ).catch(
                                                    async (error: any) => {
                                                        return {
                                                            status: false,
                                                            mensaje: 'Ocurrio un error al intentar modificar la contrasena' + error,
                                                            usuario: null
                                                        }
                                                    }
                                                )*/
                    }
                },
                async actualizarImgPerfil(_: void, {_id, img}, {db}) {

                },
                async eliminarUsuario(_: void, {_id}, {pubsub, db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.USUARIOS).findOneAndDelete({_id: new ObjectId(_id)}).then(
                        async () => {
                            await notSessionUsuario(_id, pubsub, db);
                            return {
                                estatus: true,
                                mensaje: 'El usuario fue eliminado con exito',
                                usuario: null
                            }
                        }
                    ).catch(
                        async () => {
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
