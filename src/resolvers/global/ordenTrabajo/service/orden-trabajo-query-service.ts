import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respArreglosSPag} from "../../../../services/respuestas-return";

class OrdenTrabajoQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData) {super(root, variables, context);}

    async _todasOrdenes()
    {
        return await this.buscarSinPaginacion(COLECCION.ORDEN_TRAB, {}, {}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }

    async _ordenesPenTerm(estatus: string, deptoID: string)
    {
        return await this.buscarSinPaginacion(COLECCION.ORDEN_TRAB,
            {deptoID, estatus}, {}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }
}

export default OrdenTrabajoQueryService;
