export interface ICliente
{
    _id: string;
    codigoBarras: string;
    toma: number;
    rpu: string;
    contrato: number;
    nombre: string;
    direccion: IDireccion[];
    telefono: string;
    celular: string;
    correo: string;
    email: string;
    tarifa: TARIFA
    giro: string;
    imgPerfil: string;
}

export interface IDireccion
{
    id: string;
    calle: string;
    colonia: string;
    ciudad: string;
    numero: number;
    medidor: string;
    locMedidor: string;
    caratulas: number;
}

enum TARIFA
{
    DOMESTICA = "DOMESTICA",
    COMERCIAL = "COMERCIAL"
}
