import {COLECCIONES} from "../../config/constants";

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
export async function todosDocsExternos(db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).find().toArray().then(
        async (res: any) =>
        {
            return res;
        });
}

// consultar documentos por usuario
export async function docsPorUsuario(usuario: string, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
}

// Consultar documentos por usuario y el estatus general del documento
export async function docsUsuarioEstatus(usuario: string, estatusGral: string, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({estatusGral, "usuarioDestino.usuario": usuario}, {projection: filtroDocsExt}).toArray();
}

export async function docsUsuarioEstatusPAR(dirigido: string, db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).find({dirigido, estatusGral: {$ne: "ENTREGADO"}}).toArray();
}

/*export async function buscarDocExternaRleacion(usuario: any, db: any)
 {
 return await db.collection(COLECCIONES.USUARIOS).find().toArray().populate('_id')
 }*/
