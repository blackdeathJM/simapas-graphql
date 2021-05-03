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
    anomalia: string;
    observaciones: string;
    ordenAtencion: string;
    estatus: string;
    creadaPor: string;
    ejecutadaPor: string;
    prioridad: string;
    ordenTelemetria: IOrdenTelemetria
    ordenAreaTecnica: IOrdenAreaTecnica
    notasAlmacen: Array<INotas>
    departamento: IDepartamento
}

export interface IOrdenTelemetria
{
    instalacion: string;
}

interface IOrdenAreaTecnica
{
    rpu: string;
    contrato: string;
    noMedidor: string;
    nombre: string;
    apellidos: string;
    calle: string;
    colonia: string;
    entreCalles: string;
    referencia: string;
    contacto: Array<string>;
}

interface OrdenContratos
{
    rpu: string;
    nombre: string;
    calle: string;
    colonia: string;
    contacto: Array<string>;
    noMedidor: string;
    tipoMedidor: string;
}

interface INotas
{
    nota: string;
    material: Array<IMaterial>
}

interface IMaterial
{
    cantidad: number;
    descripcion: string;
    uMedida: string;
}
