import {ObjectId} from "bson";

export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}

// forma 1 de consulta por ID
/*export async function obtenerDeptoID(id: any, db: any): Promise<any>
{
    const departamento = await db.collection('departamentos').findOne({_id: new ObjectId(id)});
    return {
        estatus: true,
        mensaje: 'Operacion realizada con exito',
        departamento
    }
}*/

// forma 2 de consulta por ID
export async function buscarDeptoID(id: any, db: any)
{
    return await db.collection('departamentos').findOne({_id: new ObjectId(id)}).then(
        async (result: any) =>
        {
            return {
                estatus: true,
                mensaje: 'Resultado de la consulta',
                departamento: result
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Fallo la consulta del departamento',
                departamento: null
            }
        }
    );
}

export async function buscarDeptoRelacion(id: any, db: any)
{
    return await db.collection('departamentos').findOne({_id: new ObjectId(id)});
}