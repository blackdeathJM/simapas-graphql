import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosSPag} from "../../../services/respuestas-return";

export class ClienteQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _clientesPorCriterio(criterio: string)
    {
        if (criterio)
        {
            const busquedaCriterio = await this.buscarSinPaginacion(COLECCION.CLIENTES,
                {
                    $or: [{nombreCompleto: {$regex: criterio, $options: "i"}}]
                }, {}, {});
            return respArreglosSPag(busquedaCriterio);
        } else
        {
            return {estatus: false, mensaje: 'no hay datos', elementos: null}
        }
    }
}
