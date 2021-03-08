import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";
import {ITelemetria} from "../../models/telemetria-interface";

export class TelemetriaMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _agIps(_id: string, tipo: string, ip: string[])
    {
        // let crearPropiedad: object = {};
        // Object.defineProperty(crearPropiedad, "telemetria.")
        //
        //
        const ipEncontrada = await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {telemetria: {$all: ip}}, {}, {});
        console.log('buscar ips', ipEncontrada);

        // return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
        //     {_id: new ObjectId(_id)},
        //     {$set: {telemetria}}, {returnOriginal: false, upsert: true}).then(
        //     resultado =>
        //     {
        //         return respDocumento(resultado);
        //     }
        // )
    }

}
