class ValidacionesService
{
    constructor() {}

    public static checarDato(valor: string)
    {
        return (!(valor === '' || valor === undefined));
    }

    public static checarObjecto(objecto: object)
    {
        return (objecto === null || objecto === undefined);
    }

    // async checarEnBaseDatosQueNoExiste(valor: object, coleccion: string)
    // {
    //     const database: Db;
    //     return await database.collection(coleccion).findOne(valor);
    // }
}

export default ValidacionesService
