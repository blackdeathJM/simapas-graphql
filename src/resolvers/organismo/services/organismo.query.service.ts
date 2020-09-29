import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {respArreglosPag} from "../../../services/respuestas-return";

class OrganismoQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _obtenerOrganismo()
    {
        return await this.buscarSinPaginacion(COLECCION.ORGANISMO, {}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default OrganismoQueryService;
