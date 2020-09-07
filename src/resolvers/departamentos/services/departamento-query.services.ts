import {COLECCION} from "../../../config/global";
import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {ObjectId} from "bson";
import {buscarTodos} from "../../../services/respuestas-return";

class DepartamentoQueryServices extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async listaElementos()
    {
        const resultado = await this.buscar(COLECCION.DEPARTAMENTOS, {}, {});
        return buscarTodos(resultado);
    }

    async elementoDetalle()
    {
        const filtro = {_id: new ObjectId(this.variables._id)};
        const res = await this.buscarUnElemento(COLECCION.DEPARTAMENTOS, filtro, {});
        return {estatus: res!.estatus, mensaje: res!.mensaje, departamento: res!.elemento}
    }
}

export default DepartamentoQueryServices;
