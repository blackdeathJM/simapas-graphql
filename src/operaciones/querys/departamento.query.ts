export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}

export async function obtenerDeptoID(id: any, db: any): Promise<any>
{
    console.log('Dentro de la funcion departamento', id);
    const deptoRes = await db.collection('departamentos').findOne({id});
    return {
        estatus: true,
        mensaje: 'Operacion realizada con exito',
        departamento: deptoRes
    }
}
