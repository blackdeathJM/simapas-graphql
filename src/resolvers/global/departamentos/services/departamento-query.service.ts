import {COLECCION} from "../../../../config/global";
import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {ObjectId} from "bson";
import {respArreglosSPag} from "../../../../services/respuestas-return";

class DepartamentoQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async listaElementos()
    {
        const resultado = await this.buscarSinPaginacion(COLECCION.DEPARTAMENTOS, {}, {}, {});
        return respArreglosSPag(resultado);
    }

    async elementoDetalle(_id: string)
    {
        const filtro = {_id: new ObjectId(_id)};
        const res = await this.buscarUnElemento(COLECCION.DEPARTAMENTOS, filtro, {});
        return {estatus: res!.estatus, mensaje: res!.mensaje, departamento: res!.elemento}
    }
}

export default DepartamentoQueryService;
