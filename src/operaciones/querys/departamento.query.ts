import { ObjectId } from "bson";

export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}
// forma 2 de consulta por ID
export async function buscarDeptoID(id: any, db: any)
{
    return await db.collection('departamentos').findOne({_id: new ObjectId(id)}).then(
        async (result: any) =>
        {
            return {
                estatus: true,
                mensaje: 'Busqueda de departamento por _id',
                departamento: result
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Fallo la consulta del departamento por _id',
                departamento: null
            }
        }
    );
}

export async function buscarDeptoRelacion(id: any, db: any)
{
    return await db.collection('departamentos').findOne({_id: new ObjectId(id)});
}
