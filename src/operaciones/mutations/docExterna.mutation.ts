import {COLECCIONES} from "../../config/constants";
import {envNotificacionDocExt} from "../subscriptions/docExterna.susbcription";
import {ObjectId} from "bson";

export async function registroDoc(regDoc: any, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).insertOne(regDoc).then(
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

export async function acUrlDocExt(id: ObjectId, docUrl: string, pubSub: any, db: any)
{
    // actualizamos el comapo docUrl para subir el documento al servidor
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {docUrl}}).then(
        async (documento: any) =>
        {
            await envNotificacionDocExt(pubSub, db);
            return {
                estatus: true,
                mensaje: 'El documento se ha actualizado con exito',
                documento
            }
        }
    ).catch(
        async (error: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar el documento',
                documento: null
            }
        }
    )
}

export async function acUrlDocExtUsuario(id: ObjectId, usuario: string, docUrl: string, pubsub: any, db: any)
{
    // Actualizamos el campo del docUrl en el arreglo de usuarios de la coleccion docExtena para almacenar el archivo temporal en lo que es aprobado
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(id), "usuarioDestino.usuario": usuario},
        {$set: {"usuarioDestino.$.docUrl": docUrl}}).then(
        async (documento: any) =>
        {
            await envNotificacionDocExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'El documento fue actualizado con exito',
                documento
            }
        }
    ).catch(
        async (error: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar el documento', error,
                documento: null
            }
        }
    );
}
