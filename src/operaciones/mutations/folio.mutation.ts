export async function registrarFolio(folio: any, db: any): Promise<any>
{
    return await db.collection('folios').findOne({numFolio: folio.numFolio}).then(
        async (rest: any) =>
        {
            if (rest !== null)
            {
                return {
                    estatus: false,
                    mensaje: 'Este numero de folio se acaba de utilizar en otro departamento por favor cierra la ventana y vuelve abrirla para generar uno nuevo',
                    folio: null
                }
            } else
            {
                return await db.collection('folios').insertOne(folio).then(
                    async (res: any) =>
                    {
                        return {
                            estatus: true,
                            mensaje: 'Se ha registrado de manera correcta el folio',
                            folio: res.ops
                        }
                    }
                ).catch(
                    async (err: any) =>
                    {
                        return {
                            estatus: false,
                            mensaje: 'Ocurrio un error al tratar de registrar el nuevo folio: ' + err,
                            folio: null
                        }
                    }
                )
            }
        }
    ).catch(
        async (err: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Ocurrio un error inesperado', err,
                folio: null
            }
        }
    )
}
