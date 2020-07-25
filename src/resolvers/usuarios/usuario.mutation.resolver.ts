import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import {ENTIDAD_DB, SUBSCRIPCIONES} from "../../config/global";
import {ObjectId} from "bson";
import {obtenerUsuarios} from "./usuario.query.resolver";

async function notSessionUsuario(pubsub: any, db: any) {
    await pubsub.publish(SUBSCRIPCIONES.NOT_USUARIOS_SESSION, {sessionUsuario: obtenerUsuarios(db)});
}

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_: void, {usuario}, {pubsub, db}) {
                    const checharUsuario = await db.collection(ENTIDAD_DB.USUARIOS).findOne({usuario: usuario.usuario});
                    if (checharUsuario !== null) {
                        return {
                            estatus: false,
                            mensaje: `El usuario ${usuario.usuario} ya existe`,
                            usuario: null
                        }
                    }
                    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
                    return await db.collection(ENTIDAD_DB.USUARIOS).insertOne(usuario).then(
                        async () => {
                            // aqui ponemos la subcripcion si se requiere
                            await notSessionUsuario(pubsub, db);
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
                    return await db.collection(ENTIDAD_DB.USUARIOS).findOneAndUpdate(
                        {usuario},
                        {$set: {nombre: usuario.nombre, img: usuario.img}}
                    ).then(
                        async () => {
                            await notSessionUsuario(pubsub, db);
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
                async eliminarUsuario(_: void, {_id}, {pubsub, db}) {
                    return await db.collection(ENTIDAD_DB.USUARIOS).findOneAndDelete({_id: new ObjectId(_id)}).then(
                        async () => {
                            await notSessionUsuario(pubsub, db);
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
