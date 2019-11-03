import bcryptjs from "bcryptjs";

export async function regUsuario(usuario: any, db: any)
{
    const checharUsuario = await db.collection('usuarios').findOne({usuario: usuario.usuario});
    if (checharUsuario !== null)
    {
        return {
            estatus: false,
            mensaje: `El usuario ${usuario.usuario} ya existe`,
            usuario: null
        }
    }
    usuario.contrasena = bcryptjs.hashSync(usuario.contrasena, 10);
    return await db.collection('usuarios').insertOne(usuario).then(() =>
    {
        return {
            estatus: true,
            mensaje: 'Datos agregados con exito',
            usuario
        };
    }).catch(() =>
    {
        return {
            estatus: false,
            mensaje: 'Usuario no se puede registrar',
            usuario: null
        }
    });
}
