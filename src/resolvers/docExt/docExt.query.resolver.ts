import {IResolvers} from "graphql-tools";
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

export async function todosDocExt(db: any)
{
    return await db.collection(COLECCIONES.DOC_EXTERNA).find().toArray().then(
        async (res: any) =>
        {
            return res;
        }).catch(
        async () =>
        {
            return null;
        }
    );
}

const queryDocExt: IResolvers =
    {
        Query:
            {
                async todosDocumentosExternos(_: void, __: void, {db})
                {
                    return await todosDocExt(db);
                },
                // consultar documentos por usuario sera usado por el admistrador
                async obDocsUsuarioExterno(_: void, {usuario}, {db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
                },
                // Consultar documentos por usuario y el estatus general del documento que sera el mismo que el estatus del usuario
                async obDocsUsuarioEstatus(_: void, {usuario, estatusGral}, {db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).find({estatusGral, "usuarioDestino.usuario": usuario}, {projection: filtroDocsExt}).toArray();
                },
                async obDocUsuarioEstatusDeUsuario(_: void, {usuario, estatus}, {db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).find({usuarioDestino: {$elemMatch: {usuario, estatus}}}, {projection: filtroDocsExt}).toArray();
                },
                async docExtRel(_: void, {_id}, {db})
                {
                    return await db.collection(COLECCIONES.DOC_EXTERNA).findOne({_id: new ObjectId(_id)});
                },
            }
    };
export default queryDocExt;
