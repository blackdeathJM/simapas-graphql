import {COLECCIONES, FECHA_ACTUAL} from "../../config/constants";
import {ObjectId} from "bson";
import {notTodosDocsExt} from "../subscriptions/docExterna.susbcription";

// Registro del documento externo
export async function registroDoc(regDoc: any, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).insertOne(regDoc).then(
        async () =>
        {
            await notTodosDocsExt(pubsub, db);
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

// Actualizamos la urldoc donde se guardara el nombre del archivo externo que sera el arhivo en el servidor y el cual podran ver los usuarios a los que se envia el documento
// y hara una subscripcion para actualizar la lista de documentos en la tabla principal
export async function acUrlDocExt(id: ObjectId, docUrl: string, pubSub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {docUrl}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubSub, db);
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
                mensaje: 'Error al intentar actualizar el documento', error,
                documento: null
            }
        }
    )
}

// Actualizamos el docUrl del usuario donde se guardara el nombre del documento en lo que es aprobado por el administrador realizamos la subscripcion para que el administrador vea la liga
// del documento y lo pueda revisar para aprobar o rechazar
export async function acUrlDocExtUsuario(id: ObjectId, usuario: string, docUrl: string, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
            _id: new ObjectId(id),
            "usuarioDestino.usuario": usuario
        },
        {$set: {"usuarioDestino.$.docUrl": docUrl}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'El documento fue actualizado con exito',
                documento: documento.value
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

// Actualizamos el campo de observaciones por usuario al que le rechazara o aprobara el documento
export async function actObsEstaPorUsuDocExt(_id: string, usuario: string, observaciones: string, estatus: string, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
            _id: new ObjectId(_id),
            "usuarioDestino.usuario": usuario
        },
        {$set: {"usuarioDestino.$.observaciones": observaciones, "usuarioDestino.$.estatus": estatus}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'Los datos se han actualizado con exito',
                documento: documento.value
            }
        }).catch(
        async (error: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar los datos', error,
                documento: null
            }

        });
}

// Actializamos el estatus general y el folio de nuevo por si no se guardo cuando se cargo
// el documento asi como el estatus del usuario cuando se le apruebe el documento pasandolo a---------
export async function acEstEstGralFolioUsuario(_id: string, usuario: string, estatus: string, estatusGral: string, folio: string, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id), "usuarioDestino.usuario": usuario},
        {$set: {estatusGral, folio, "usuarioDestino.$.estatus": estatus}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'Ha cambiado el estatus del documento',
                documento: documento.value
            }
        }).catch((error: any) =>
    {
        return {
            estatus: false,
            mensaje: 'Hubo un error al tratar de actualizar el documento', error,
            documento: null
        }
    })
}

// Actualizamos el campo donde se va a guardar el archivo cargado final por el usuario
export async function acDocExtEstatusGralDocRepUrlFolio(_id: ObjectId, estatusGral: string, docRespUrl: string, folio: string, pubsub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id)},
        {$set: {estatusGral, docRespUrl, folio}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'El archivo fue colocado en la raiz del documento',
                documento: documento.value
            }
        }).catch((error: any) =>
    {
        return {
            estatus: false,
            mensaje: 'Error al intentar guardar el documento consulta al administrador', error,
            documento: null
        }
    })
}

// Actualizamos el estatusGeneral del documento como el estatus del usuario a Terminado para dar por finalizado el proceso
export async function acEstatusGralEstatusUsuarioTerminado(_id: string, estatusGral: string, acuseUrl: string, folio: string, pubSub: any, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id)},
        {$set: {estatusGral, folio, acuseUrl, fechaTerminado: FECHA_ACTUAL}}).then(
        async (documento: any) =>
        {
            await notTodosDocsExt(pubSub, db);
            return {
                estatus: true,
                mensaje: 'El documento se ha actualizado con exito, y se ha dado por terminado el proceso',
                documento: documento.doc
            }
        }).catch(
        async (err: any) =>
        {
            return {
                estatus: false,
                mensaje: 'Ha ocurrido un error al intentar actualizar el documento' + err,
                documento: null
            }
        }
    )
}
