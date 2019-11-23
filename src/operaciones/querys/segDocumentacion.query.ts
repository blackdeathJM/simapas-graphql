export async function todosLosDocumentos(db: any)
{
    return await db.collection('segDocumentacion').find().toArray().then(
        async (res: any) =>
        {
            return res;
        });
}

export async function docsPorUsuario(dirigido: any, db: any)
{
    return await db.collection('segDocumentacion').find({dirigido}).toArray().then(async (res: any) =>
    {
        return res;
    });
}

export async function docsPorUsuarioYEstatus(dirigido: string, estatus: boolean, db: any)
{
    return await db.collection('segDocumentacion').find({dirigido, estatus}).toArray().then(async (res: any) =>
    {
        return res;
    });
}