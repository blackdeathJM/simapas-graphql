import {IDepartamento} from "../resolvers/departamentos/model/departamento.interface";
import {IUsuario} from "../resolvers/usuarios/models/usuario-interface";
import {IDocExt} from "../resolvers/docExt/models/docExt.interface";
import {IFolio} from "../resolvers/folios/models/folio-interface";
import {IPaginacion} from "./paginacion-interface";
import {IOrganismo} from "../resolvers/organismo/models/organismo.interface";
import {IInstalacion} from "../resolvers/telemetria/models/instalacion.interface";
import {IParametrosElectricos} from "../resolvers/telemetria/models/parametros-electricos.interface";
import {ITelemetria} from "../resolvers/telemetria/models/telemetria-interface";
import {IBomba, IMotor} from "../resolvers/telemetria/models/equipo-electrico-interface";
import {ILecturas} from "../resolvers/telemetria/models/lecturas-interface";
import {INivelesED} from "../resolvers/telemetria/models/niveles-interface";

export interface IVariables
{
    _id?: string,
    departamento?: IDepartamento;
    usuario?: IUsuario;
    docExt?: IDocExt;
    folio?: IFolio;
    paginacion?: IPaginacion;
    organismo?: IOrganismo;
    instalacion?: IInstalacion;
    telemetria?: ITelemetria;
    parametrosElectricos?: IParametrosElectricos;
    motor?: IMotor;
    bomba?: IBomba;
    lecturas?: ILecturas;
    niveles?: INivelesED;
}
