import {COLECCIONES} from "../../config/constants";
import {ObjectId} from "bson";
import {notTodosDocsExt} from "../subscriptions/docExterna.susbcription";


export async function registroDoc(regDoc: any, pubsub: any, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).insertOne(regDoc).then(
        async () => {
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
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(id)}, {$set: {docUrl}}).then(
        async (documento: any) => {
            await notTodosDocsExt(pubSub, db);
            return {
                estatus: true,
                mensaje: 'El documento se ha actualizado con exito',
                documento
            }
        }
    ).catch(
        async (error: any) => {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar el documento', error,
                documento: null
            }
        }
    )
}

export async function acUrlDocExtUsuario(id: ObjectId, usuario: string, docUrl: string, pubsub: any, db: any) {
    // Actualizamos el campo del docUrl en el arreglo de usuarios de la coleccion docExtena para almacenar el archivo temporal en lo que es aprobado
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
            _id: new ObjectId(id),
            "usuarioDestino.usuario": usuario
        },
        {$set: {"usuarioDestino.$.docUrl": docUrl}}).then(
        async (documento: any) => {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'El documento fue actualizado con exito',
                documento: documento.value
            }
        }
    ).catch(
        async (error: any) => {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar el documento', error,
                documento: null
            }
        }
    );
}

export async function actObsEstaPorUsuDocExt(_id: string, usuario: string, observaciones: string, estatus: string, pubsub: any, db: any) {
    // Actualizamos el campo de observaciones y el estatus cuando el administrador rechaza el documento
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({
            _id: new ObjectId(_id),
            "usuarioDestino.usuario": usuario
        },
        {$set: {"usuarioDestino.$.observaciones": observaciones, "usuarioDestino.$.estatus": estatus}}).then(
        async (documento: any) => {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'Los datos se han actualizado con exito',
                documento: documento.value
            }
        }).catch(
        async (error: any) => {
            return {
                estatus: false,
                mensaje: 'Error al intentar actualizar los datos', error,
                documento: null
            }

        });
}

export async function acEstEstGralFolioUsuario(_id: string, usuario: string, estatus: string, estatusGral: string, folio: string, pubsub: any, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id), "usuarioDestino.usuario": usuario},
        {$set: {estatusGral, folio, "usuarioDestino.$.estatus": estatus}}).then(
        async (documento: any) => {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'Ha cambiado el estatus del documento',
                documento: documento.value
            }
        }).catch((error: any) => {
        return {
            estatus: false,
            mensaje: 'Hubo un error al tratar de actualizar el documento', error,
            documento: null
        }
    })
}

// Actualizamos el campo donde se va a guardar el archivo cargado final por el usuario
export async function acDocExtEstatusGralDocRepUrlFolio(_id: ObjectId, estatusGral: string, docRespUrl: string, folio: string, pubsub: any, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOneAndUpdate({_id: new ObjectId(_id)},
        {$set: {estatusGral, docRespUrl, folio}}).then(
        async (documento: any) => {
            await notTodosDocsExt(pubsub, db);
            return {
                estatus: true,
                mensaje: 'El archivo fue colocado en la raiz del documento',
                documento: documento.value
            }
        }).catch((error: any) => {
        return {
            estatus: false,
            mensaje: 'Error al intentar guardar el documento consulta al administrador', error,
            documento: null
        }
    })
}
