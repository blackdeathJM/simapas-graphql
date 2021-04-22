export interface IDocumentacion
{
    ineFrente: string;
    ineTrasera: string;
    predial: string;
    curp: string;
}

export interface IContrato
{
    noMedidor: string;
    noContrato: string;
    fechaAlta: string;
    calle: string;
    entreCalles: string;
    referencia: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    municipio: string;
    pais: string;
    estado: string;
    sector: number;
    ruta: number;
    tarifa: string;
    giro: string;
    zona: string;
    noFamiliasEnToma: number;
    documentacion: IDocumentacion;
    activo: boolean;
}

export interface ICliente
{
    folio: number;
    codigoQr: string;
    rpu: string;
    noCta: string;
    nombre: string;
    apellidos: string;
    telefonos: string[];
    email: string;
    rfc: string;
    iva: number;
    estatusUsuario: string;
    colorEstatusUsuario: string;
    grupoFact: number;
    hyperlink: string;
    activoEnInternet: boolean;
    usuarioActivo: boolean;
    obs: string;
    creadaPor: string;
    modificadaPor: string[];
}


