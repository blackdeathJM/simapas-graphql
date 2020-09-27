import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respDocumento} from "../../../../services/respuestas-return";
import {ObjectId} from 'bson';
import * as _ from "lodash";

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
        const resul = await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {}, {}, {});
        const tele: any[] = [];
        const valoresRecibidos: any[] = [];

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
        const teleConvertido = tele.join().split(",");
        console.log('Valores de la Db', teleConvertido);
        valoresRecibidos.push(this.variables.telemetria?.radio);
        valoresRecibidos.push(this.variables.telemetria?.plc);
        valoresRecibidos.push(this.variables.telemetria?.repetidor);
        valoresRecibidos.push(this.variables.telemetria?.switch);

        const valorConvertidoRecibido = _.compact(valoresRecibidos.join().split(","));
        // console.log('*********', valoresRecibidos.join().split(","));

        console.log('+++++', _.difference(valorConvertidoRecibido, teleConvertido));

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
