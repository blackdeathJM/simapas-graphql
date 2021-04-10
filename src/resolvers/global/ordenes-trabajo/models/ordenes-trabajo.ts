import {IDepartamento} from "../../departamentos/model/departamento.interface";

export interface IOrdenesTrabajo
{
    _id?: string;
    noOrden: string;
    departamentoId: string;
    fechaOrden: string;
    fechaEjecucion: string;
    tipoOrden: string;
    comentarios: string;
    observaciones: string;
    ordenAtencion: string;
    notasAlmacen: Array<string>;
    estatus: string;
    creadaPor: string;
    ejecutadaPor: string;
    departamento: IDepartamento;
    ordenesTipoA: IOrdenTipoA;
    ordenesTipoB: IOrdenTipoB;
}

export interface IOrdenTipoA
{
    instalacion: string;
    desProblema: string;
}

export interface IOrdenTipoB
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
