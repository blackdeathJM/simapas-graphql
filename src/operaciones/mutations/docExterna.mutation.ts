import {COLECCIONES} from "../../config/constants";

export async function registroDoc(regDoc: any, db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).insertOne(regDoc).then(
        async () =>
        {
            return {
                estatus: true,
                mensaje: 'El documento fue registrado con exito',
                documento: regDoc
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
