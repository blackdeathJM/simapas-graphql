export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}
