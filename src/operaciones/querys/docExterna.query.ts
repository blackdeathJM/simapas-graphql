import {COLECCIONES} from "../../config/constants";
import {ObjectId} from "bson";

let filtroDocsExt =
    {
        "identificadorDoc": 1,
        "folio": 1,
        "dependencia": 1,
        "comentario": 1,
        "observaciones": 1,
        "asunto": 1,
        "fechaRecepcion": 1,
        "fechaLimitEntrega": 1,
        "acuseUrl": 1,
        "docUrl": 1,
        "docRespUrl": 1,
        "estatusGral": 1,
        "usuarioDestino.$": 1
    };

// consultar todos los documentos para la consulta del administrador
export async function todosDocsExternos(db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).find().toArray().then(
        async (res: any) => {
            return res;
        }).catch(
        async () => {
            return null;
        }
    );
}

// consultar documentos por usuario
export async function docsPorUsuario(usuario: string, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
}

// Consultar documentos por usuario y el estatus general del documento
export async function docsUsuarioEstatus(usuario: string, estatusGral: string, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({estatusGral, "usuarioDestino.usuario": usuario}, {projection: filtroDocsExt}).toArray();
}

export async function obDocsExtUsuarioFolio(usuario: string, estatus: string, db: any) {
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({usuarioDestino: {$elemMatch: {usuario, estatus}}}, {projection: filtroDocsExt}).toArray();
}

export async function buscarDocExt(_id: ObjectId, db: any) {
    console.log('id', _id);
    return await db.collection(COLECCIONES.DOC_EXTERNA).findOne({_id: new ObjectId(_id)});
}
