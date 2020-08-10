import {IResolvers} from "graphql-tools";
import {ENTIDAD_DB} from "../../config/global";
import {Db} from "mongodb";

export async function todasNotificacionesDocInterna(db: Db) {
    return await db.collection(ENTIDAD_DB.DOC_INTERNA).find().toArray();
}

const modeloDocInterna =
    {
        "fechaCreacion": 1,
        "asunto": 1,
        "contenido": 1,
        "atte": 1,
        "folioInterno": 1,
        "num": 1,
        "usuarioDestino.$": 1
    };

const queryDocInterna: IResolvers =
    {
        Query:
            {
                async obNotiDocInterna(_: void, __: void, {db}) {
                    return await todasNotificacionesDocInterna(db);
                },
                async obNotiUsuario(_: void, {usuario}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_INTERNA).find({"usuarioDestino.usuario": usuario}).toArray();
                },
                async obNotUsuarioVisto(_: void, {usuario, visto}, {db}) {
                    const database = db as Db;
                    return await database.collection(ENTIDAD_DB.DOC_INTERNA).find({usuarioDestino: {$elemMatch: {usuario, visto}}}, {projection: modeloDocInterna}).toArray();
                }
            }
    };
export default queryDocInterna;
