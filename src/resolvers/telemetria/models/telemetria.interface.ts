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

export interface IParametrosElectricos
{
    voltajes: [IVoltajes];
    amperajes: [IAmperajes];
    factorPotencia: [IFactorPotencia];
    kilowats: [IKw];
}

interface IVoltajes
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedioV: number;
}

interface IAmperajes
{
    ano: number;
    mes: number;
    dia: number;
    a1: number;
    a2: number;
    a3: number;
    promedioA: number;
}

interface IFactorPotencia
{
    ano: number;
    mes: number;
    dia: number;
    f1: number;
    f2: number;
    f3: number;
    promedioF: number;
}

interface IKw
{
    ano: number;
    mes: number;
    dia: number;
    k1: number;
    k2: number;
    k3: number;
    promedioK: number;
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
