export interface IParametrosElectricos
{
    voltajes: IParametros;
    amperajes: IParametros;
    factorPotencia: IParametros;
    kilowats: IParametros;
}

interface IParametros
{
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}
