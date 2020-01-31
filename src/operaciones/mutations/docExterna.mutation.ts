import {COLECCIONES} from "../../config/constants";
import {envNotificacionDocExt} from "../subscriptions/docExterna.susbcription";
import {ObjectId} from "bson";

export async function registroDoc(regDoc: any, pubsub: any, db: any) {
    return await db.collection(COLECCIONES.DOCEXTERNA).insertOne(regDoc).then(
        async () => {
            await envNotificacionDocExt(pubsub, db).then().catch(err => console.log(err));
            return {
                estatus: true,
                mensaje: 'El documento fue registrado con exito',
                documento: regDoc
            }
        }
    ).catch(
        async (err: any) => {
            return {
                estatus: false,
                mensaje: 'Ocurrio un error al intentar registrar el documento: ', err,
                documento: null
            }
        }
    )
}

export async function acUrlDocExt(id: ObjectId, docUrl: string, pubSub: any, db: any) {
    // actualizamos el comapo docUrl para subir el documento al servidor
    return await db.collection(COLECCIONES.DOCEXTERNA).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {docUrl}}).then(
        async (documento: any) => {
            return {
                estatus: true,
                mensaje: 'El documento se ha actualizado con exito',
                documento
            }
        }
    )
}
