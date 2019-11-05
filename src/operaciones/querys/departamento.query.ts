export async function obtenerDeptos(db: any)
{
    return await db.collection('departamentos').find().toArray();
}

// forma 1 de consulta por ID
export async function obtenerDeptoID(id: any, db: any): Promise<any>
{
    const departamento = await db.collection('departamentos').findOne({_id: id});
    console.log('Valor de la respuesta para obetener departamento por id', departamento);
    return {
        estatus: true,
        mensaje: 'Operacion realizada con exito',
        departamento
    }
}

// forma 2 de consulta por ID
export async function buscarDeptoID(id: any, db: any)
{
    const deptoRes = await db.collection('departamentos').findOne({_id: id}).then(
        async () =>
        {
            return {
                estatus: true,
                mensaje: 'Resultado de la consulta',
                departamento: deptoRes
            }
        }
    ).catch(
        async () =>
        {
            return {
                estatus: false,
                mensaje: 'Fallo la consulta del departamento',
                departamento: deptoRes
            }
        }
    );
}
