import {Db} from "mongodb";

export const asignarDocId = async (database: Db, coleccion: string, ordenar: object = {registerDate: -1}) =>
{
    const ultimoElemento = await database.collection(coleccion).find().limit(1).sort(ordenar).toArray();
    if (ultimoElemento.length === 0)
    {
        return '1';
    }
    return String(+ultimoElemento[0].id + 1);
};
export const buscarElementos = async (database: Db, coleccion: string, filtro: object = {}) =>
{
    return await database.collection(coleccion).find(filtro).toArray();
}
export const buscarUnElemento = async (database: Db, coleccion: string, filtro: object) =>
{
    return database.collection(coleccion).findOne(filtro);
};
export const insertarUnElemento = async (database: Db, coleccion: string, documento: object) =>
{
    return await database.collection(coleccion).insertOne(documento);
};

export const insertarVariosElementos = async (database: Db, coleccion: string, documentos: Array<object>) =>
{
    return await database.collection(coleccion).insertMany(documentos)
}
export const buscarUnoYActualizar = async (database: Db, coleccion: string, filtro: object, actualizarObj: object, opciones: object) =>
{
    return await database.collection(coleccion).findOneAndUpdate(filtro, actualizarObj, opciones);
}
export const buscarUnoYEliminar = async (database: Db, coleccion: string, filtro: object = {}) =>
{
    return await database.collection(coleccion).findOneAndDelete(filtro);
}
