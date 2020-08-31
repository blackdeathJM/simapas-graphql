import {COLECCION} from "../config/global";
import ResolversOperacionesService from "./resolver-operaciones";
import {IContextData} from "../interfaces/context-data-interface";

class DepartamentoServices extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async listaElementos()
    {
        const resultado = await this.lista(COLECCION.DEPARTAMENTOS, 'Departamentos');
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, departamentos: resultado.elementos};
    }
}

export default DepartamentoServices;
