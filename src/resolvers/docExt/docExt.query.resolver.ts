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
        "noProceso": 1,
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

export async function todosDocExt(db: Db) {
    return await db.collection(ENTIDAD_DB.DOC_EXTERNA).find().toArray().then(
        async (res: any) => {
            return res;
        }).catch(
        async () => {
            return null;
        }
    );
}

const queryDocExt: IResolvers =
    {
        Query:
            {
                async todosDocsExt(_, __, {db}) {
                    return await todosDocExt(db);
                },
                // consultar documentos por usuario sera usado por el admistrador
                async obDocsUsuarioExterno(_, {usuario}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
                },
                // Consultar documentos por usuario y el noProces Donde sea menor ya que puede ser PERNDIENTE O RECHAZADO
                async usuarioNoProceso(_: void, {usuario, noProceso}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({noProceso: {$lte: noProceso}, "usuarioDestino.usuario": usuario},
                        {projection: filtroDocsExt}).toArray();
                },

                async noSubprocesoUsuario(_, {usuario, noSubproceso}, {db}) {
                    const database = db as Db;
                    return await db.collection(ENTIDAD_DB.DOC_EXTERNA).find({usuarioDestino: {$elemMatch: {usuario, noSubproceso}}}, {projection: filtroDocsExt}).toArray();
                },
                async docExtRel(_, {_id}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).findOne({_id: new ObjectId(_id)});
                },
                async docEntreFechas(_, {fechaRecepcion}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_EXTERNA).find({$gte: fechaRecepcion, $lte: fechaRecepcion}).toArray();
                }
            }
    };
export default queryDocExt;
