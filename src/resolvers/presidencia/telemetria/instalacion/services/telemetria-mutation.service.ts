import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";

export class TelemetriaMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _agIps(_id: string, tipo: string, ip: string)
    {
        const ipEncontrada = await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {
                $or: [{"telemetria.radio": ip}, {"telemetria.plc": ip}, {"telemetria.switch": ip}, {"telemetria.repetidor": ip},
                    {"telemetria.camara": ip}]
            }, {}, {});

        if (ipEncontrada.elementos?.length !== 0)
        {
            return {
                estatus: false,
                mensaje: 'No puedes registrar esa direccion ip porque ya se encuentra en uso trata con otra diferente',
                elemento: []
            }
        } else
        {
            const crearPropiedad: object = {};
            Object.defineProperty(crearPropiedad, "telemetria." + tipo,
                {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: ip
                });
            return this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id)},
                {$push: crearPropiedad}, {}).then(
                res =>
                {
                    return respDocumento(res);
                })
        }
    }

}
