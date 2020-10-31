import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respArreglosPag} from "../../../../services/respuestas-return";

class OrdenTrabajoQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData) {super(root, variables, context);}

    async _todasOrdenes()
    {
        return await this.buscar(COLECCION.ORDEN_TRAB, {}, {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default OrdenTrabajoQueryService;
