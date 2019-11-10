export async function folioUltimo(db: any)
{
    return await db.collection('folios').find().limit(1).sort({numFolio: -1}).toArray();
}

export async function todosLosFolios(db: any)
{
    return await db.collection('folios').find().toArray();
}

// Formato para la asignacion de folios SMP-DH-numeroDeAsignacion/año
