import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respArreglosSPag} from "../../../../services/respuestas-return";

export class OrdenesTrabajoQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async todasOrdenes()
    {
        const todasOrdnes = await this.buscarSinPaginacion(COLECCION.ORDENES_TRAB, {}, {}, {noOrden: -1});
        console.log('respuesta', todasOrdnes);
        return respArreglosSPag(todasOrdnes);
    }
}
