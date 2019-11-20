export interface IFolioRes
{
    status: boolean;
    mensaje: string;
    folio: IFolio;
}

export interface IFolio
{
    _id: string;
    numFolio: number;
    titulo: string;
    folio: string;
    tipo: string;
    descripcion: string;
    fechaCreacion: string;
    asigUsuario: string;
    archivoUrl: string
}
