export async function todosLosDocumentos(db: any)
{
    return await db.collection('segDocumentacion').find().toArray().then(
        async (res: any) =>
        {
            return res;
        });
}

export async function docsPorUsuario(usuario: String, db: any)
{
    return await db.collection('segDocumentacion').find({usuario}).toArray().then(async (res: any) =>
    {
        return res;
    });
}