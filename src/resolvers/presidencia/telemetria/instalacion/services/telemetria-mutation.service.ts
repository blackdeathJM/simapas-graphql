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
        const ipEncontrada = await this.buscarIpDuplicadas(ip);

        if (ipEncontrada.elementos?.length !== 0)
        {
            return {
                estatus: false,
                mensaje: 'No puedes registrar esa direccion ip porque ya se encuentra en uso trata con otra diferente',
                elemento: []
            }
        } else
        {
            const crearPropiedad: object = this.defProp('telemetria.', tipo, ip);
            return this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id)},
                {$push: crearPropiedad}, {returnOriginal: false}).then(
                res =>
                {
                    return respDocumento(res);
                })
        }
    }

    async _actElimIp(_id: string, tipo: string, ipAnterior: string, ipNva: string)
    {
        const ipEncontrada = await this.buscarIpDuplicadas(ipNva);

        if (ipNva === '000.000.000.000')
        {
            const ipAQuitar = this.defProp("telemetria.", tipo, ipAnterior);
            return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id)},
                {$pull: ipAQuitar}, {returnOriginal: false}).then(
                res =>
                {
                    return respDocumento(res);
                });
        } else
        {
            if (ipEncontrada.elementos?.length !== 0)
            {
                return {
                    estatus: false,
                    mensaje: 'No puedes asignar esta direccion IP porque ya se encuentra en uso',
                    elementos: []
                }
            } else
            {
                const ipNueva = this.defProp("telemetria.", tipo, ipNva);

                const ipConsulta = this.defProp("telemetria.", tipo, ipAnterior);

                await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                    {_id: new ObjectId(_id)},
                    {$pull: ipConsulta}, {returnOriginal: false});

                return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                    {_id: new ObjectId(_id)},
                    {$push: ipNueva}, {returnOriginal: false}).then(
                    res =>
                    {
                        return respDocumento(res);
                    });
            }

        }
    }

    defProp(texto: string | object, tipo: string, ip: string | object): object
    {
        const crearPropiedad: object = {};
        Object.defineProperty(crearPropiedad, texto + tipo,
            {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ip
            });
        return crearPropiedad;
    }

    async buscarIpDuplicadas(ip: string)
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {
                $or: [{"telemetria.radio": ip}, {"telemetria.plc": ip}, {"telemetria.switch": ip}, {"telemetria.repetidor": ip},
                    {"telemetria.camara": ip}]
            }, {}, {});
    }
}
