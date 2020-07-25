import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import JWT from "../../lib/jwt";
import {ENTIDAD_DB} from "../../config/global";

export async function obtenerUsuarios(db: any) {
    return await db.collection(ENTIDAD_DB.USUARIOS).find().toArray();
}

const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_: void, __: any, {db}) {
                    return await obtenerUsuarios(db);
                },
                async buscarUsuario(_: any, {usuario}, {db}) {
                    return await db.collection(ENTIDAD_DB.USUARIOS).findOne({usuario: usuario.usuario}).then(
                        async (usuario: any) => {
                            return {
                                estatus: true,
                                mensaje: 'La busqueda fue satisfactoria',
                                usuario
                            }
                        }
                    ).catch(
                        async (err: any) => {
                            return {
                                estatus: false,
                                mensaje: 'Error en la busqueda', err,
                                usuario: null
                            }
                        }
                    )
                },
                async login(_: void, {usuario, contrasena}, {db}) {
                    const loginUsuario = await db.collection(ENTIDAD_DB.USUARIOS).findOne({usuario});
                    if (loginUsuario === null) {
                        return {
                            estatus: false,
                            mensaje: 'Login incorrectos el usuario no existe',
                            token: null
                        };
                    }
                    if (!bcryptjs.compareSync(contrasena, loginUsuario.contrasena)) {
                        return {
                            estatus: false,
                            mensaje: 'Login incorrecto, la contraseña es incorrecta',
                            token: null
                        };
                    }
                    delete loginUsuario.contrasena;
                    return {
                        estatus: true,
                        mensaje: 'Login correcto',
                        token: new JWT().firmar({loginUsuario})
                    };
                },
                async perfil(_: void, __: any, {token}) {
                    let info: any = new JWT().verificar(token);
                    if (info === 'La autenticacion del token es invalida, por favor inicia sesion') {
                        return {
                            estatus: false,
                            mensaje: info,
                            usuario: null
                        }
                    }
                    return {
                        estatus: true,
                        mensaje: 'El token es correcto',
                        usuario: info.usuario.loginUsuario
                    };
                },

            }
    };
export default queryUsuarios;
