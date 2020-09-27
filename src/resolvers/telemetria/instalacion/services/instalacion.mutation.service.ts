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
        console.log('telemetria', this.variables.telemetria?.radio);
        const resul = await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {}, {}, {});
        console.log('+++>', resul);
        let tele: any[] = [];

        resul.elementos?.forEach(value =>
        {
            if (value.telemetria !== undefined)
            {
                // tele.push(value.telemetria);
                tele.push(value.telemetria.radio);
                tele.push(value.telemetria.plc);
                tele.push(value.telemetria.switch);
                tele.push(value.telemetria.repetidor);
            }

        });
        console.log("-------", tele.join().split(","));

        // return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
        //     {_id: new ObjectId(this.variables._id)},
        //     {$set: {telemetria: this.variables.telemetria}}, {returnOriginal: false, upsert: true}).then(
        //     resultado =>
        //     {
        //         return respDocumento(resultado);
        //     }
        // )
    }
}

export default InstalacionMutationService;
