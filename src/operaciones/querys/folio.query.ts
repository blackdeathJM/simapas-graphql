export async function todosLosFolios(db: any)
{
    return await db.collection('folios').find().toArray().then(
        async (res: any) =>
        {
            return {
                estatus: true,
                mensaje: 'La consulta de todos los folio realizada con exito',
                folio: res
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Error al intentar consultar todos los folios',
                folio: null
            }
        }
    );
}

export async function folioUltimo(db: any)
{
    return await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray();
}

export async function folioPorUsuario(asigUsuario: string, db: any)
{
    return await db.collection('folios').find({asigUsuario}).toArray().then(async (res: any) =>
    {
        return {
            estatus: true,
            mensaje: 'Consulta realizada correctamente',
            folio: res
        }
    });
}

// Formato para la asignacion de folios SMP-DH-numeroDeAsignacion/año
