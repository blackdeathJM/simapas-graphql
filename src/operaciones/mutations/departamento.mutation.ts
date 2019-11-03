export async function registroDepto(departamento: any, db: any)
{
    return await db.collection('departamentos').insertOne(departamento).then(() =>
    {
        return {
            estatus: true,
            mensaje: `El departamento ${departamento.nombre} se registro de manera correcta`,
            departamento
        }
    }).catch((err: any) =>
    {
        return {
            estatus: false,
            mensaje: `Error al intentar registrar el departamento: ${err}`,
            departamento: null
        }
    });
}
