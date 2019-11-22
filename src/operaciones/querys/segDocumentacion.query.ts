export async function docsPorUsuario(usuario: String, db: any)
{
    return await db.collection('segDocumentacion').find({usuario}).toArray().then((res: any) =>
    {
        return {
            res
        }
    })
}