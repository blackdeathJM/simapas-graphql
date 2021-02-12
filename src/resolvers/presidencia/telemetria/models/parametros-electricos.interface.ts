export interface IParametrosElectricos
{
    voltajes: IVoltajes;
    amperajes: IAmperajes;
    factorPotencia: IFactorPotencia;
    kilowats: IKw;
}

interface IVoltajes
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}

interface IAmperajes
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}

interface IFactorPotencia
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}

interface IKw
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}
