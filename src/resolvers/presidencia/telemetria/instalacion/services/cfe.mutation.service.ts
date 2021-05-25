import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {IMedidor} from "../../models/medidor-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";
import {IRecibosCfe} from "../../models/recibos-cfe-interface";

export class CfeMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regMedidor(_id: string, medidor: IMedidor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)},
            {$addToSet: {medidores: medidor}}, {returnDocument: "after", upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaMedidor(_id: string, medidor: string, fechaBaja: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), medidores: {$elemMatch: {medidor}}},
            {$set: {"medidores.$.fechaRetiro": fechaBaja, "medidores.$.activa": false}}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _regReciboCfe(_id: string, medidor: string, reciboCfe: IRecibosCfe)
    {
        const buscarRecibo = await this.buscarUnElemento(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), medidores: {$elemMatch: {medidor, recibos: {$elemMatch: {mes: reciboCfe.mes, ano: reciboCfe.ano}}}}}, {});

        if (buscarRecibo.estatus)
        {
            return respDocumento(buscarRecibo);
        } else
        {
            const resultado = await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
                {_id: new ObjectId(_id), medidores: {$elemMatch: {medidor}}},
                {$addToSet: {"medidores.$.recibos": reciboCfe}}, {returnDocument: "after", uptosert: true});
            return respDocumento(resultado);
        }
    }
}
