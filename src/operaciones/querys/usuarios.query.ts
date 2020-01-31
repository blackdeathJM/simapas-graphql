import bcryptjs from "bcryptjs";
import JWT from "../../lib/jwt";

export async function obtenerTodosLosUsuarios(db: any)
{
    return await db.collection('usuarios').find().toArray();
}

export async function loginUsuario(usuario: string, contrasena: string, db: any)
{
    const loginUsuario = await db.collection('usuarios').findOne({usuario});
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
}

export async function perfilUsuario(token: string)
{
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
}

export async function obtenerUsuarioPorSuNombreDeUsuario(usuario: string, db: any)
{
    return await db.collection('usuarios').findOne({usuario}).then(
        async (res: any) =>
        {
            return {
                estatus: true,
                mensaje: 'La busqueda fue satisfactoria',
                usuario: res
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
