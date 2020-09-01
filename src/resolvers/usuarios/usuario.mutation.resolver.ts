import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import {COLECCION} from "../../config/global";
import {ObjectId} from "bson";
import {Db} from "mongodb";
import JWT from "../../lib/jwt";
import UsuarioMutationService from "./services/usuario-mutation-service";

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_, {usuario}, {db})
                {
                    return new UsuarioMutationService(_, {usuario}, {db}).agregarUsuario();
                },

                async actualizarRole(_, {_id, role}, {pubsub, db})
                {

                    return new UsuarioMutationService(_, {_id, role}, {pubsub, db}).actualizarRole();
                    // const database = db as Db;
                    // return await database.collection(COLECCION.USUARIOS).findOneAndUpdate({_id: new ObjectId(_id)},
                    //     {$set: {role}}, {returnOriginal: false}).then(
                    //     async (respuesta: any) =>
                    //     {
                    //         delete respuesta.value.contrasena;
                    //         respuesta.value.contrasena = '*******';
                    //         const nvoTokenRole = respuesta.value;
                    //         const subscripcion = pubsub as PubSub;
                    //
                    //         await subscripcion.publish(PUB_SUB.NOT_CAMBIO_ROLE, {cambiarRoleUsuario: new JWT().firmar(nvoTokenRole)});
                    //
                    //         return {
                    //             estatus: true,
                    //             mensaje: 'Se ha modificado con exito el rol del usuarios',
                    //             usuario: respuesta.value
                    //         }
                    //     }
                    // ).catch(
                    //     async () =>
                    //     {
                    //         return {
                    //             estatus: false,
                    //             mensaje: 'Error al tratar de modificar roles',
                    //             usuario: null
                    //         }
                    //     }
                    // )
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
