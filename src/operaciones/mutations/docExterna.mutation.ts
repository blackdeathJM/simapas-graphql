import {COLECCIONES} from "../../config/constants";
import {envNotificacionDocExt} from "../subscriptions/docExterna.susbcription";

export async function registroDoc(regDoc: any, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).insertOne(regDoc).then(
        async () =>
        {
            await envNotificacionDocExt(pubsub, db).then().catch(err => console.log(err));
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
