import {COLECCIONES} from "../../config/constants";

// consultar todos los documentos para la consulta del administrador
export async function todosLosDocumentos(db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).find().toArray().then(
        async (res: any) =>
        {
            return res;
        });
}

// consultar documentos por usuario
export async function docsPorUsuario(usuario: string, db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).find({'usuarioDestino': {$elemMatch: {usuario}}}).toArray().then();
}

// Consultar documentos por usuario y el estatus general del documento
export async function docsPorUsuarioYEstatus(dirigido: string, estatus: string, autorizado: boolean, db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).find({$and: [{dirigido}, {estatus}, {autorizado}]}).toArray().then(async (res: any) =>
    {
        return res;
    });
}

export async function docsUsuarioEstatusPAR(dirigido: string, db: any)
{
    return await db.collection(COLECCIONES.DOCEXTERNA).find({dirigido, estatus: {$ne: "ENTREGADO"}}).toArray();
}
