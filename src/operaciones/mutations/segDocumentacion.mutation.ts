export async function agregarDocSeguimiento(segDocumentacion: any, db: any)
{
    return await db.collection('segDocumentacion').insertOne(segDocumentacion).then(
        async () =>
        {
            return {
                estatus: true,
                mensaje: 'El documento fue registrado con exito',
                documento: segDocumentacion
            }
        }
    ).catch(
        async (err: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Ocurrio un error al intentar registrar el documento: ', err,
                documento: null
            }
        }
    )
}