import {IParametrosElectricos} from "./parametros-electricos.interface";
import {INiveles} from "./niveles-interface";
import {ITelemetria} from "./telemetria-interface";

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
    niveles: INiveles[]
}
