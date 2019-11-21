export async function todosLosFolios(db: any)
{
    return await db.collection('folios').find().toArray().then(async (res: any) =>
    {
        return {
            estatus: true,
            mensaje: 'Consulta realizada con exito',
            folio: res
        }
    }).catch((err: any) =>
    {
        return {
            estatus: false,
            mensaje: 'Error al tratar de obtener todos los departamentos',
            folio: null
        }
    });
}

export async function folioUltimo(db: any)
{
    return await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray().then(async (res: any) =>
    {
        return {
            estatus: true,
            mensaje: 'Consulta realizada con exito',
            folio: res
        }
    }).catch((err: any) =>
    {
        return {
            estatus: false,
            mensaje: 'Ha ocurrido un error al tratar de realizar la consulta', err,
            folio: null
        }
    });
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
    }).catch((err: any) =>
    {
        return {
            estatus: false,
            mensaje: 'Error al tratar de consultar el folio por usuario', err,
            folio: null
        }
    });
}

// Formato para la asignacion de folios SMP-DH-numeroDeAsignacion/año
