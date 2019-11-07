export async function ultimoFolio(folio: any, db: any)
{
    return await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray().then(
        async (res: any) =>
        {
            return {
                estatus: true,
                mensaje: 'Busqueda exitosa',
                folio: res
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Error al consultar el Ultimo folio generado',
                folio: null
            }
        }
    )
}

// Formato para la asignacion de folios SMP-DH-numeroDeAsignacion/año
