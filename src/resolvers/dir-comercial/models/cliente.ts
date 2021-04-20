export interface ICliente
{

    folio: number;
    codigoQr: string;
    rpu: string;
    noCta: number;
    nombre: string;
    apellidos: string;
    telefonos: string[];
    email: string;
    rfc: string;
    iva: number;
    estatusUsuario: string;
    colorEstatusUsuario: string;
    grupoFact: number;
    deposito: number;
    envio: string;
    prorroga: string;
    hyperlink: string;
    activoEnInternet: boolean;
    usuarioActivo: boolean;
    obs: string;
    contratos: IContrato[];
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

export interface IDocumentacion
{
    identificacion: string[];
    predial: string[];
    curp: string;
}
