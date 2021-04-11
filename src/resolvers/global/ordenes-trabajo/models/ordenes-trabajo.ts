import {IDepartamento} from "../../departamentos/model/departamento.interface";

export interface IOrdenesTrabajo
{
    _id: string;
    noOrden: number;
    departamentoId: string;
    fechaOrden: string;
    fechaEjecucion: string;
    tipoOrden: string;
    comentarios: string;
    descProblema: string;
    observaciones: string;
    ordenAtencion: string;
    notasAlmacen: Array<string>;
    estatus: string;
    creadaPor: string;
    ejecutadaPor: string;
    ordenTelemetria: IOrdenTelemetria;
    ordenAreaTecnica: IOrdenAreaTecnica;
    departamento: IDepartamento;
}

export interface IOrdenTelemetria
{
    instalacion: string;
}

export interface IOrdenAreaTecnica
{
    rpu: string;
    contrato: string;
    noMedidor: string;
    ultimaLectura: number;
    lecturaAnterior: number;
    edoMedidor: string;
    instMedidor: string;
    locMedidor: string;
    nombre: string;
    calle: string;
    colonia: string;
    contacto: Array<string>;
}

export interface OrdenContratos
{
    rpu: string;
    nombre: string;
    calle: string;
    colonia: string;
    contacto: Array<string>;
    noMedidor: string;
    tipoMedidor: string;
}
