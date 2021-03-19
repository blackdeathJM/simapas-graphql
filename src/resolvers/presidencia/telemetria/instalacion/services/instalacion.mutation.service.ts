import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {respDocumento} from "../../../../../services/respuestas-return";
import {ObjectId} from 'bson';
import {ILecturas} from "../../models/lecturas-interface";
import _ from "lodash";
import {IMedidor} from "../../models/medidor-interface";
import {IRecibosCfe} from "../../models/recibos-cfe-interface";
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
            {$set: {...instalacion}}, {returnOriginal: false}).then(
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

    async _regLecturas(lecturas: ILecturas, tipo: string)
    {
        let agregarOActualizar: object = {};
        Object.defineProperty(agregarOActualizar, "lecturas." + tipo, {
            value: lecturas,
            configurable: true,
            enumerable: true,
            writable: true
        });
        let filtro: object = {_id: new ObjectId(this.variables._id)};
        Object.defineProperty(filtro, "lecturas." + tipo, {
            value: {$elemMatch: {ano: lecturas.ano}},
            writable: true,
            configurable: true,
            enumerable: true
        });

        return await this.buscarUnElemento(COLECCION.TELEMETRIA,
            filtro, {}).then(
            async resultado =>
            {
                if (resultado.estatus)
                {
                    let x: object = {};
                    resultado.elemento.lecturas[tipo].filter((v: ILecturas) =>
                    {
                        if (v.ano === lecturas.ano)
                        {
                            const clonConsu = {...v};
                            delete clonConsu.total;
                            delete clonConsu.ano;
                            const clonLect = {...lecturas};
                            delete clonLect.total;
                            delete clonLect.ano;
                            lecturas.total = _.sum(_.toArray(clonConsu)) + _.sum(_.toArray(clonLect));
                            x = Object.assign(v, lecturas);
                        }
                    });

                    let actualizarValor: object = {};
                    Object.defineProperty(actualizarValor, "lecturas." + tipo + ".$", {
                        value: x,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                    return this.buscarUnoYActualizar(COLECCION.TELEMETRIA, filtro,
                        {$set: actualizarValor}, {returnOriginal: false, upsert: true}).then(
                        res =>
                        {
                            return respDocumento(res);
                        }
                    )
                } else
                {
                    return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                        {_id: new ObjectId(this.variables._id)},
                        {$addToSet: agregarOActualizar}, {ReturnOriginal: false, upsert: true}).then(
                        r =>
                        {
                            return respDocumento(r);
                        }
                    )
                }
            }
        )
    }

    async _regMedidor(medidor: IMedidor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$addToSet: {medidores: medidor}}, {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaMedidor(medidor: string, fechaBaja: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), medidores: {$elemMatch: {medidor}}},
            {$set: {"medidores.$.fechaRetiro": fechaBaja, "medidores.$.activa": false}}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _regReciboCfe(reciboCfe: IRecibosCfe)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id)},
            {$addToSet: {recibosCfe: reciboCfe}}, {returnOriginal: false, uptosert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default InstalacionMutationService;
