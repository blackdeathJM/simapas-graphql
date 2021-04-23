import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosSPag} from "../../../services/respuestas-return";

export class ClienteQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _clientesPorCriterio(criterio: string)
    {
        const busquedaCriterio = await this.buscarSinPaginacion(COLECCION.CLIENTES,
            {
                $or: [{rpu: {$regex: criterio, $options: "i"}}, {nombre: {$regex: criterio, $options: "i"}},
                    {apellidos: {$regex: criterio, $options: "i"}}]
            }, {}, {});

        return respArreglosSPag(busquedaCriterio);
    }
}
