export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}

export async function obtenerDeptoID(_id: any, db: any): Promise<any>
{
    console.log('Dentro de la funcion departamento', _id);
    const deptoRes = await db.collection('departamentos').find({_id: _id});
    console.log('??????????????', deptoRes);
    return {
        estatus: true,
        mensaje: 'Busqueda de departamento',
        departamento: deptoRes
    }
}
