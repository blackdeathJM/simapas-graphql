import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";
import {ObjectId} from 'bson';

class OrganismoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _regOrganismo()
    {
        const contarDocumentos = await this.contarDocumentos(COLECCION.ORGANISMO, {});
        if (contarDocumentos.total >= 1)
        {
            return await this.buscarUnoYActualizar(COLECCION.ORGANISMO, {_id: new ObjectId(this.variables._id)},
                {$set: this.variables.organismo!}, {returnOriginal: false}).then(
                resultado =>
                {
                    return respDocumento(resultado);
                }
            )
        } else
        {
            return await this.agregarUnElemento(COLECCION.ORGANISMO, this.variables.organismo!, {}).then(
                async resultado =>
                {
                    return respDocumento(resultado);
                }
            )
        }
    }
}

export default OrganismoMutationService
