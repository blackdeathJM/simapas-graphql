import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {ObjectId} from "bson";
import {Db} from "mongodb";
import {filtroDocsExt} from "./proyecciones";

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

export async function usuarioSubproceso(usuario: string, subprocesos: string[], db: Db)
{
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
                async todosLosDocsPorUsuario(_, {usuario}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
                },
                // Consultar documento que sera enviado al usuario el subproceso es un array
                async usuarioSubproceso(_: void, {usuario, subprocesos}, {db})
                {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find(
                        {usuarioDestino: {$elemMatch: {usuario, subproceso: {$in: subprocesos}}}},
                        {projection: filtroDocsExt}).toArray().then(async (documentos) =>
                    {
                        return documentos;
                    });
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

// =====================================================================================================================
// ============================================================================================================
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
