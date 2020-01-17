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
    return await db.collection('usuarios').insertOne(usuario).then(
        async () =>
        {
            // aqui ponemos la subcripcion si se requiere
            return {
                estatus: true,
                mensaje: 'Datos agregados con exito',
                usuario
            };
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Usuario no se puede registrar',
                usuario: null
            }
        }
    )
}

export async function actualizarPerfilUsuario(usuario: string, nombre: string, img: string, db: any)
{
    return await db.collection('usuarios').findOneAndUpdate(
        {usuario},
        {$set: {nombre, img}}
    ).then(
        async () =>
        {
            return {
                estatus: true,
                mensaje: 'Datos actualizados de manera correcta'
            }
        }
    ).catch(
        async () =>
        {
            {
                return {
                    estatus: false,
                    mensaje: 'Error al intentar actualizar el perfil de este usuario',
                    usuario: null
                }
            }
        }
    );
}
