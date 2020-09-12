import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";
import {ObjectId} from 'bson';

class OrganismoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _regOrganismo()
    {
        return await this.agregarUnElemento(COLECCION.ORGANISMO, {}, {}).then(
            async resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _actOrganismo()
    {
        return await this.buscarUnoYActualizar(COLECCION.ORGANISMO, {_id: new ObjectId(this.variables._id)},
            this.variables.organismo!, {returnOriginal: false}).then(
            async resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default OrganismoMutationService
