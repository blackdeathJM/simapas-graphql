import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosSPag} from "../../../services/respuestas-return";

export class SolicitudesQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _solPorCliente(idCliente: string)
    {
        const solicitudesRealizadas = await this.buscarSinPaginacion(COLECCION.SOLICITUDES,
            {idCliente}, {}, {});

        console.log('res', solicitudesRealizadas);
        return respArreglosSPag(solicitudesRealizadas);
    }
}
