import {IDepartamento} from "../resolvers/departamentos/model/departamento.interface";
import {IUsuario} from "../resolvers/usuarios/models/usuario-interface";
import {IDocExt} from "../resolvers/docExt/models/docExt.interface";
import {IFolio} from "../resolvers/folios/models/folio-interface";

export interface IVariables
{
    _id?: string,
    departamento?: IDepartamento;
    usuario?: IUsuario;
    docExt?: IDocExt;
    folio?: IFolio
}
