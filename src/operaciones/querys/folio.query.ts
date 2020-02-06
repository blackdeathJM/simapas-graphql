import {ObjectId} from "bson";
import {COLECCIONES} from "../../config/constants";

export async function todosLosFolios(db: any)
{
    return await db.collection('folios').find().toArray().then((res: any) =>
    {
        return res;
    });
}

export async function folioUltimo(db: any)
{
    return await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray().then(async (res: any) =>
    {
        return res;
    });
}

export async function folioPorUsuario(asigUsuario: string, db: any)
{
    return await db.collection('folios').find({asigUsuario}).toArray();
}

export async function buscarFolioRelID(_id: string, db: any)
{
    return await db.collection(COLECCIONES.FOLIOS).findOne({_id: new ObjectId(_id)});
}

// Formato para la asignacion de folios SMP-DH-numeroDeAsignacion/año
