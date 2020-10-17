export interface IBomba
{
    serie: string;
    marca: string;
    modelo: string;
    noImpulsores: number;
    rpm: number;
    tipo: string;
    diametro: number;
    lts: number;
    descripcion: string;
    eficiencia: number;
    fechaInstalacion: string;
    FechaRetiro: string;
    observaciones: string;
    imgEvidencia: string[];
    activa: boolean;
}

export interface IMotor
{
    serie: string;
    marca: string;
    modelo: string;
    hp: number;
    voltaje: number;
    amperaje: number;
    factPotencia: number;
    eficiencia: number;
    descripcion: string;
    fechaInstalacion: string;
    fechaRetiro: string;
    observaciones: string;
    imgEvidencia: string;
    activa: boolean;
}
