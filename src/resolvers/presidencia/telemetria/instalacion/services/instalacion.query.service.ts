import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../../config/global";
import {respArreglosSPag} from "../../../../../services/respuestas-return";

class InstalacionQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: object) {super(root, context);}

    async _todasInstalaciones()
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => respArreglosSPag(resultado)
        )
    }
}

export default InstalacionQueryService
