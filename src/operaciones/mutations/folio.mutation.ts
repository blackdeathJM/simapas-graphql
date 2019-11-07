export async function registrarFolio(folio: any, db: any): Promise<any>
{
    const checarFolio = await db.collection('folios').findOne({numFolio: folio.numFolio});
    if (checarFolio !== null)
    {
        console.log('numero de folio', checarFolio);
        return {
            estatus: false,
            mensaje: 'El folio no se pudo resgistrar porque fue asignado cierra la ventana y vuelvela abrir para generar un nuevo FOLIO',
            folio: null
        }
    }
    /*    const ultimoFolio = await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray();
        if (ultimoFolio === 0)
        {
            folio.numFolio = 1;
        } else
        {
            folio.numFolio = ultimoFolio[0].ultimoFolio = + 1
        }*/
    return await db.collection('folios').insertOne(folio).then(
        async (res: any) =>
        {
            console.log('Respuesta', res);
            return {
                estatus: true,
                mensaje: 'Folio registrado de manera correcta',
                folio: res
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Error al intentar registrar el folio',
                folio: null
            }
        }
    )
}
