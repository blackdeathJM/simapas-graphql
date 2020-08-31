import {Db} from "mongodb";

class ValidacionesService
{
    constructor() {}

    public static checarDato(valor: string)
    {
        return (!(valor === '' || valor === undefined));
    }

    // async checarEnBaseDatosQueNoExiste(valor: object, coleccion: string)
    // {
    //     const database: Db;
    //     return await database.collection(coleccion).findOne(valor);
    // }
}

export default ValidacionesService
