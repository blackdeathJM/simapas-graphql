import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../services/respuestas-return";

class OrganismoQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _obtenerOrganismo()
    {
        return await this.buscarUnElemento(COLECCION.ORGANISMO, {_id: new ObjectId(this.variables._id)}, {}).then(
            async resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default OrganismoQueryService;
