import bcryptjs from "bcryptjs";
import JWT from "../../lib/jwt";

export async function obtenerTodosLosUsuarios(db: any)
{
    return await db.collection('usuarios').find().toArray();
}

export async function loginUsuario(usuario: string, contrasena: string, db: any)
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
    return {
        estatus: true,
        mensaje: 'Login correcto',
        token: new JWT().sign({loginUsuario})
    };
}

export async function perfilUsuario(token: string)
{
    let info: any = new JWT().verify(token);
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

export async function obtenerUsuarioPorSuNombreDeUsuario(usuario: string, db: any)
{
    // const datosUsuario = await db.collection('usuarios').findOne({usuario: usuario});
    const datosUsuario = await db.collection('usuarios').findOne({usuario});
    console.log('??????????', datosUsuario);
    return {
        estatus: true,
        mensaje: 'Usuario buscado por su ID',
        usuario: datosUsuario
    }
}
