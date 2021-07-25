import {COLECCION} from "../../../../config/global";
import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {ObjectId} from "bson";

class DepartamentoQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _obtenerDeptos()
    {
        const resultado = await this.buscarSinPaginacion(COLECCION.DEPARTAMENTOS, {}, {}, {});
        return {
            ...resultado
        };
    }

    async elementoDetalle(_id: string)
    {
        const filtro = {_id: new ObjectId(_id)};
        const res = await this.buscarUnDocumento(COLECCION.DEPARTAMENTOS, filtro, {});
        return {estatus: res!.estatus, mensaje: res!.mensaje, departamento: res!.documento}
    }
}

export default DepartamentoQueryService;
