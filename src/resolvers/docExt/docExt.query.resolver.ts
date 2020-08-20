import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {ObjectId} from "bson";
import {Db} from "mongodb";

let filtroDocsExt =
    {
        "_id": 1,
        "identificadorDoc": 1,
        "folio": 1,
        "noSeguimiento": 1,
        "proceso": 1,
        "dependencia": 1,
        "comentario": 1,
        "observaciones": 1,
        "asunto": 1,
        "fechaRecepcion": 1,
        "fechaLimiteEntrega": 1,
        "fechaTerminado": 1,
        "acuseUrl": 1,
        "docUrl": 1,
        "docRespUrl": 1,
        "usuarioDestino.$": 1
    };

export async function todosDocExt(db: Db)
{
    return await db.collection(ENTIDAD_DB.DOC_EXTERNA).find().toArray().then(
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
                // Obtenermos todos los documentos externos
                async todosDocsExt(_, __, {db})
                {
                    return await todosDocExt(db);
                },
                // consultar documentos por usuario sera usado por el admistrador
                async obDocsUsuarioExterno(_, {usuario}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
                },
                // Consultar documento que sera enviado al usuario
                async usuarioSubproceso(_: void, {usuario, subproceso}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find(
                        {usuarioDestino: {$elemMatch: {usuario, subproceso: {$in: ['PENDIENTE', 'RECHAZADO', 'APROBADO', 'ACUSE']}}}},
                        {projection: filtroDocsExt}).toArray();
                    // return await database.collection(ENTIDAD_DB.DOC_EXTERNA).aggregate([
                    //     {
                    //         $project:
                    //             {
                    //                 usuarioDestino:
                    //                     {
                    //                         $filter:
                    //                             {
                    //                                 input: "$usuarioDestino",
                    //                                 as: 'sub',
                    //                                 cond: {$eq: ["$$sub.subproceso", subproceso]}
                    //                             }
                    //                     }
                    //             }
                    //     }
                    // ]).toArray().then(async (resultado) => resultado).catch(error => console.log('Error: ' + error));
                },

                async docExtRel(_, {_id}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOne({_id: new ObjectId(_id)});
                },
                async docEntreFechas(_, {fechaRecepcion}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({$gte: fechaRecepcion, $lte: fechaRecepcion}).toArray();
                }
            }
    };
export default queryDocExt;
