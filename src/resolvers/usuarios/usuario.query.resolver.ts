import {IResolvers} from "graphql-tools";
import bcryptjs from "bcryptjs";
import JWT from "../../lib/jwt";
import {COLECCION} from "../../config/global";
import {Db} from "mongodb";
import UsuarioQueryService from "./services/usuario-query-service";

export async function obtenerUsuario(usuario: any, db: Db)
{
    return await db.collection(COLECCION.USUARIOS).findOne({usuario: usuario.usuario}).then(
        async (usuario: any) =>
        {
            return {
                estatus: true,
                mensaje: 'La busqueda fue satisfactoria',
                usuario
            }
        }
    ).catch(
        async (err: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Error en la busqueda', err,
                usuario: null
            }
        }
    )
}

const queryUsuarios: IResolvers =
    {
        Query:
            {
                async obtenerUsuarios(_, __, {db})
                {
                    return new UsuarioQueryService(_, __, {db}).listarUsuarios();
                },
                async buscarUsuario(_, {usuario}, {db})
                {
                    return new UsuarioQueryService(_, {usuario}, {db}).buscarUsuarioPorUsuario();
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    const database = db as Db;
                    const loginUsuario = await database.collection(COLECCION.USUARIOS).findOne({usuario});
                    if (loginUsuario === null)
                    {
                        return {
                            estatus: false,
                            mensaje: 'Login incorrectos el usuarios no existe',
                            token: null
                        };
                    }
                    if (!bcryptjs.compareSync(contrasena, loginUsuario.contrasena))
                    {
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

                async validarTokenG(_, __, {token})
                {
                    let infoToken: any = new JWT().verificar(token);
                    try
                    {
                        if (infoToken)
                        {
                            return {
                                estatus: true,
                                mensaje: 'Token valido',
                                usuario: infoToken.usuario.loginUsuario
                            }
                        } else
                        {
                            return {
                                estatus: false,
                                mensaje: infoToken,
                                usuario: null
                            }
                        }
                    } catch (error)
                    {
                        return {
                            estatus: false,
                            mensaje: `Ocurrio una excepcion que no se puedo controlar: ${error}`,
                            usuario: null
                        }
                    }
                },
            }
    };
export default queryUsuarios;
