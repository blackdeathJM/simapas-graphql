export interface IParametrosElectricos
{
    voltajes: Array<IParametros>;
    amperajes: Array<IParametros>;
    factorPotencia: Array<IParametros>;
    kilowats: Array<IParametros>;
}

export interface IParametros
{
    id: string;
    ano: number;
    mes: number;
    dia: number;
    v1: number;
    v2: number;
    v3: number;
    promedio: number;
}
