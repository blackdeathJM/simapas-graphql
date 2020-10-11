import {IParametrosElectricos} from "./parametros-electricos.interface";

export interface IInstalacion
{
    _id: string;
    nombre: string;
    direccion: string;
    noInstalacion: number;
    profPozo: number;
    diamPerfo: number;
    diamAdeme: number;
    diamColumna: number;
    LongColumna: number;
    activo: boolean;
    telemetria: ITelemetria;
    parametrosElectricos: IParametrosElectricos;
    niveles: INiveles[];
    lecturasMacros: ILecturasMacro[];
    bomba: IBomba[];
}

export interface ITelemetria
{
    radio: string[];
    plc: string[];
    switch: string[];
    repetidor: string[];
}

interface INiveles
{
    ano: number;
    mes: number;
    dia: number;
    tipoNivel: string;
    nivel: number;
}

interface ILecturasMacro
{
    ano: number;
    mes: number;
    dia: number;
    lectura: number;
    total: number;
}

interface IBomba
{
    descripcion: string;
    marca: string;
    serie: string;
    hp: number;
    eficiencia: number;
    lstPorSeg: number;
    fechaInstalacion: string;
    FechaRetiro: string;
    observaciones: string;
    imgEvidencia: string[];
    activa: boolean;
}
