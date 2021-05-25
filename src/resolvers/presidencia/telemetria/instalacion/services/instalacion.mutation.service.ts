import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {respDocumento} from "../../../../../services/respuestas-return";
import {ObjectId} from 'bson';
import {IInstalacion} from "../../models/instalacion.interface";

class InstalacionMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _registroInstalacion(instalacion: IInstalacion)
    {
        delete instalacion._id;
        instalacion.fechaRet = '';

        return await this.agregarUnElemento(COLECCION.TELEMETRIA, instalacion, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _actInstalacion(instalacion: IInstalacion)
    {
        const _id = instalacion._id;
        delete instalacion._id;

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)},
            {$set: {...instalacion}}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _desInstalacion()
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {}, {}, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default InstalacionMutationService;
