import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respDocumento} from "../../../../services/respuestas-return";
import {ObjectId} from 'bson';

class InstalacionMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData) {super(root, variables, context);}

    async _registroInstalacion()
    {
        return await this.agregarUnElemento(COLECCION.TELEMETRIA, this.variables, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _actInstalacion()
    {
        const _id = this.variables.instalacion?._id;
        delete this.variables.instalacion?._id;
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(_id)},
            {$set: this.variables.instalacion}, {returnOriginal: false}).then(
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

    async _telemetria()
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$set: {telemetria: this.variables.telemetria}}, {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _regParamElectricos()
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, {_id: new ObjectId(this.variables._id)},
            {
                $addToSet:
                    {
                        "parametrosElectricos.voltajes": this.variables.parametrosElectricos?.voltajes,
                        "parametrosElectricos.amperajes": this.variables.parametrosElectricos?.amperajes,
                        "parametrosElectricos.factorPotencia": this.variables.parametrosElectricos?.factorPotencia,
                        "parametrosElectricos.kilowats": this.variables.parametrosElectricos?.kilowats
                    }
            },
            {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default InstalacionMutationService;
