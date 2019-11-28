export async function todosLosDocumentos(db: any)
{
    return await db.collection('segDocumentacion').find().toArray().then(
        async (res: any) =>
        {
            return res;
        });
}

export async function docsPorUsuario(dirigido: string, db: any)
{
    return await db.collection('segDocumentacion').find({dirigido}).toArray().then(async (res: any) =>
    {
        return res;
    });
}

export async function docsPorUsuarioYEstatus(dirigido: string, estatus: string, autorizado: boolean, db: any)
{
    return await db.collection('segDocumentacion').find({$and: [{dirigido}, {estatus}, {autorizado}]}).toArray().then(async (res: any) =>
    {
        return res;
    });
}

export async function docsUsuarioEstatusPAR(dirigido: string, db: any)
{
    return await db.collection('segDocumentacion').find({dirigido, estatus: {$ne: "ENTREGADO"}}).toArray();
}