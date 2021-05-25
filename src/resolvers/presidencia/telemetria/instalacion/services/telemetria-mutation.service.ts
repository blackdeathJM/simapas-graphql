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
            const crearPropiedad: object = TelemetriaMutationService.defProp('telemetria.', tipo, ip);
            return this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id)},
                {$push: crearPropiedad}, {returnDocument: "after"}).then(
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
            const ipAQuitar = TelemetriaMutationService.defProp("telemetria.", tipo, ipAnterior);
            return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id)},
                {$pull: ipAQuitar}, {returnDocument: "after"}).then(
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
                const identificador = {_id: new ObjectId(_id)};
                const ipConsulta = TelemetriaMutationService.defProp("telemetria.", tipo, ipAnterior);
                const ipNueva = TelemetriaMutationService.defProp(`telemetria.${tipo}.$`, '', ipNva);

                return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, Object.assign(identificador, ipConsulta),
                    {$set: ipNueva}, {returnDocument: "after"}).then(
                    res =>
                    {
                        return respDocumento(res);
                    });
            }

        }
    }

    private static defProp(texto: string, tipo: string, ip: string): object
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

    private async buscarIpDuplicadas(ip: string)
    {
        return await this.buscarSinPaginacion(COLECCION.TELEMETRIA,
            {
                $or: [{"telemetria.radio": ip}, {"telemetria.plc": ip}, {"telemetria.switch": ip}, {"telemetria.repetidor": ip}, {"telemetria.camara": ip}]
            }, {}, {});
    }
}
