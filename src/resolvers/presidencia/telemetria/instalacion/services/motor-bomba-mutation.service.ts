import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {IBomba, IMotor} from "../../models/equipo-electrico-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";

export class MotorBombaMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);

    }

    async _regMotor(_id: string, motor: IMotor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)},
            {$addToSet: {motor}}, {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        );
    }

    async _regBobma(_id: string, bomba: IBomba)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)},
            {$addToSet: {bomba}}, {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaMotor(fechaBaja: string, id: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), motor: {$elemMatch: {id}}},
            {$set: {"motor.$.fechaRetiro": fechaBaja, "motor.$.activa": false}}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _bajaBomba(fechaBaja: string, id: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(this.variables._id), bomba: {$elemMatch: {id}}},
            {$set: {"bomba.$.fechaRetiro": fechaBaja, "bomba.$.activa": false}}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}