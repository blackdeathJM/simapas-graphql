import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../../config/global";
import {respArreglosSPag} from "../../../../../services/respuestas-return";
import {ObjectId} from 'bson';

class InstalacionQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: object) {super(root, variables, context);}

    async _todasInstalaciones()
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado => respArreglosSPag(resultado)
        )
    }

    async _reciboCfeDuplicado(ano: number, mes: number, medidor: string)
    {
        return await this.buscarUnElemento(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), recibosCfe: {$elemMatch: {ano, mes, medidor}}}, {}).then(
            resulado =>
            {
                return resulado.estatus
            }
        )
    }

    async _todosRecibosCfe(medidor: string)
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)}, {}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }
}

export default InstalacionQueryService
