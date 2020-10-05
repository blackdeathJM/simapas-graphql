export interface IInstalacion
{
    _id: string;
    nombre: string;
    direccion: string;
    noInstalacion: number;
    activo: boolean;
    telemetria: ITelemetria;
    parametrosElectricos: IParametrosElectricos;
    bomba: IBomba[]
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
    ano: string;
    mes: string;
    fechaRegistro: string;
    voltajes: IVoltajes[];
    amperajes: IAmperajes[];
    factorPotencia: IFactorPotencia[];
}

interface IVoltajes
{
    v1: number;
    v2: number;
    v3: number;
    totalV: number;
}

interface IAmperajes
{
    a1: number;
    a2: number;
    a3: number;
    totalA: number;
}

interface IFactorPotencia
{
    f1: number;
    f2: number;
    f3: number;
    totalF: number;
}

interface IBomba
{
    descripcion: string;
    marca: string;
    serie: string;
    hp: number;
    eficiencia: number;
    fechaInstalacion: string;
    FechaRetiro: string;
    observaciones: string;
    imgEvidencia: string[];
    activa: boolean;
}
