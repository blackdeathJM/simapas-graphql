import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../config/global";
import {respArreglosPag} from "../../../../services/respuestas-return";

class InstalacionQueryServices extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _todasInstalaciones()
    {
        return await this.buscar(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => respArreglosPag(resultado)
        )
    }
}

export default InstalacionQueryServices
