import {IDepartamento} from "../resolvers/departamentos/model/departamento.interface";
import {IUsuario} from "../resolvers/usuarios/models/usuario-interface";
import {IDocExt} from "../resolvers/docExt/models/docExt.interface";
import {IFolio} from "../resolvers/folios/models/folio-interface";
import {IPaginacion} from "./paginacion-interface";
import {IOrganismo} from "../resolvers/organismo/models/organismo.interface";

export interface IVariables
{
    _id?: string,
    departamento?: IDepartamento;
    usuario?: IUsuario;
    docExt?: IDocExt;
    folio?: IFolio;
    paginacion?: IPaginacion;
    organismo?: IOrganismo;
}
