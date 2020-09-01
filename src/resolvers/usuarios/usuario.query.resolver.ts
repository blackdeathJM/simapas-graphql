import {IResolvers} from "graphql-tools";
import JWT from "../../lib/jwt";
import UsuarioQueryService from "./services/usuario-query-service";
import {COLECCION} from "../../config/global";
import {Db} from "mongodb";

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
                    return new UsuarioQueryService(_, {usuario}, {db}).buscarPorUsuario();
                },
                async login(_, {usuario, contrasena}, {db})
                {
                    return new UsuarioQueryService(_, {usuario: usuario, contrasena: contrasena}, {db}).loginUsuario();
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
