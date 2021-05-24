export interface IDocumentacion
{
    ineFrente: string;
    ineTrasera: string;
    predial: string;
    cartaPoder: string;
    constanciaNoOficial: string;
    orginalPagoRedAgua: string;
    permisoRomperPav: string;
    pagoVerfServ: string;
    nichoMed: string;
    curp: string;
}

export interface IModificadaPor
{
    usuario: string;
    fechaHora: string;
    comentario: string;
}

export interface IDatosFacturacion
{
    nombre: string;
    calle: string;
    colonia: string;
    rfc: string;
    correo: string;
    rpuAFacturar: string[];
}

export interface IConvenioContrato
{
    folioConvenio: string;
    calle: string;
    colonia: string;
    cp: string;
    fechaConvenio: string;
    fechaTerminoConvenio: string;
    comentarios: string;
}

export interface ISolicitudServ
{
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    noCuentaRef: string;
    tipoPredio: string;
    areaPredio: number;
    areaConstruida: number;
    almacenamiento: string;
    tipoDeUso: string;
    MaterialArroyoDeCalle: string;
    MaterialAcera: string;
    comentarios: string;
    aprovado: boolean;
    latitud: number;
    longitud: number;
    creadoPor: string;
}

export interface IContrato
{
    rpu: string;
    noMedidor: string;
    noContrato: string;
    noCuenta: string;
    fechaAlta: string;
    calle: string;
    entreCalles: string;
    referencia: string;
    estado: string;
    ciudad: string;
    municipio: string;
    colonia: string;
    codigoPostal: string;
    sector: number;
    ruta: number;
    tarifa: string;
    giro: string;
    zona: string;
    noPersonas: number;
    activo: boolean;
    esPrincipal: boolean;
    documentosImg: IDocumentacion;
    creadoPor: string;
    modificadoPor: IModificadaPor[];
    convenio: IConvenioContrato;
}

export interface ICliente
{
    _id: string;
    nombreCompleto: string;
    telefonos: string[];
    contratos: IContrato[];
    datosDeFacturacion: IDatosFacturacion[];
}

