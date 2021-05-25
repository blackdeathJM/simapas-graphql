import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respArreglosSPag} from "../../../../services/respuestas-return";

export class NotificacionQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _listarNotificaciones(receptor: string)
    {
        return await this.buscarSinPaginacion(COLECCION.NOT, {receptor}, {}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            });
    }
}
