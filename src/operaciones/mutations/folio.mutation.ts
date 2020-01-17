import { ObjectId } from "bson";

export async function registrarFolio(folio: any, db: any): Promise<any>
{
    return await db.collection('folios').findOne({numFolio: folio.numFolio}).then(
        async (rest: any) =>
        {
            if (rest)
            {
                return {
                    estatus: false,
                    mensaje: 'Este numero de folio se acaba de utilizar en otro departamento por favor cierra la ventana y vuelve abrirla para generar uno nuevo',
                    folio: null
                }
            } else
            {
                return await db.collection('folios').insertOne(folio).then(
                    async () =>
                    {
                        return {
                            estatus: true,
                            mensaje: 'Se ha registrado de manera correcta el folio',
                            folio
                        }
                    }
                ).catch(
                    async () =>
                    {
                        return {
                            estatus: false,
                            mensaje: 'Ocurrio un error al tratar de registrar el nuevo folio: ',
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

export async function acUrlFolio(id: ObjectId, archivoUrl: string, db: any)
{
    console.log('nuevo', archivoUrl);
    return await db.collection('folios').findOneAndUpdate({_id: new ObjectId(id)}, {$set: {archivoUrl}}).then(
        async () =>
        {
            return {
                _id: id,
                archivoUrl
            }
        }
    ).catch(
        async () =>
        {
            return {
                _id: 'Error no se registro'
            }
        }
    );
}
