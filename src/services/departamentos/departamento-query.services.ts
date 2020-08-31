import {COLECCION} from "../../config/global";
import ResolversOperacionesService from "../resolver-operaciones";
import {IContextData} from "../../interfaces/context-data-interface";

class DepartamentoQueryServices extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async listaElementos()
    {
        const resultado = await this.lista(COLECCION.DEPARTAMENTOS, 'Departamentos');
        return {estatus: resultado.estatus, mensaje: resultado.mensaje, departamentos: resultado.elementos};
    }

    async elementoDetalle()
    {
        const res = await this.detalleElemento(COLECCION.DEPARTAMENTOS);
        return {estatus: res!.estatus, mensaje: res!.mensaje, departamento: res!.elemento}
    }
}

export default DepartamentoQueryServices;
