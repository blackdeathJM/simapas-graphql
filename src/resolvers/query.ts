import {IResolvers} from "graphql-tools";
import JWT from "../lib/jwt";
import bcryptjs from 'bcryptjs';

const query: IResolvers =
    {
        Query:
            {
                // ==================================DEPARTAMENTOS==============================================
                async departamentos(_: void, __: any, {db}): Promise<any>
                {
                    return await db.collection('departamentos').find().toArray();
                },
                // ==================================FIN DEPARTAMENTOS==========================================
                // =================================USUARIOS====================================================
                async usuarios(_: void, __: any, {db}): Promise<any>
                {
                    return await db.collection('usuarios').find().toArray();
                },
                async login(_: void, {usuario, contrasena}, {db}): Promise<any>
                {
                    const loginUsuario = await db.collection('usuarios').findOne({usuario});
                    if (loginUsuario === null)
                    {
                        return {
                            estatus: false,
                            mensaje: 'Login incorrectos el usuario no existe',
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
                    console.log(loginUsuario);
                    return {
                        estatus: true,
                        mensaje: 'Login correcto',
                        token: new JWT().sign({loginUsuario})
                    };
                },
                perfil(_: void, __: any, {token})
                {
                    let info: any = new JWT().verify(token);
                    console.log(info.usuario.loginUsuario);
                    if (info === 'La autenticacion del token es invalida, por favor inicia sesion')
                    {
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
                }
                // ====================================FIN USUARIOS=============================================
            }
    };
export default query;
