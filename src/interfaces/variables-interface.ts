import {IDepartamento} from "../resolvers/global/departamentos/model/departamento.interface";
import {IUsuario} from "../resolvers/usuarios/models/usuario-interface";
import {IDocExt} from "../resolvers/presidencia/documentacion/docExt/models/docExt.interface";
import {IPaginacion} from "./paginacion-interface";
import {IInstalacion} from "../resolvers/presidencia/telemetria/models/instalacion.interface";
import {IParametrosElectricos} from "../resolvers/presidencia/telemetria/models/parametros-electricos.interface";
import {ITelemetria} from "../resolvers/presidencia/telemetria/models/telemetria-interface";
import {IBomba, IMotor} from "../resolvers/presidencia/telemetria/models/equipo-electrico-interface";

export interface IVariables
{
    _id?: string,
    departamento?: IDepartamento;
    usuario?: IUsuario;
    docExt?: IDocExt;
    paginacion?: IPaginacion;
    instalacion?: IInstalacion;
    telemetria?: ITelemetria;
    parametrosElectricos?: IParametrosElectricos;
    motor?: IMotor;
    bomba?: IBomba;
}
