export interface IInstalacion
{
    _id: string;
    nombre: string;
    direccion: string;
    noInstalacion: number;
    activo: boolean;
    telemetria: Array<ITelemetria>;
}

export interface ITelemetria
{
    radio: Array<string>;
    plc: Array<string>;
    switch: Array<string>;
    repetidor: Array<string>;
}
