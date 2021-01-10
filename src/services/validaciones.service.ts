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
}

export default ValidacionesService
