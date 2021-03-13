import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {IBomba, IMotor} from "../../models/equipo-electrico-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";
import {nvaProp} from "../../../../../services/definirPropiedades";

export class MotorBombaMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);

    }

    async _regMotor(_id: string, motor: IMotor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)}, {$addToSet: {motor}}, {returnOriginal: false, upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        );
    }

    async _actMotor(_id: string, motor: IMotor)
    {

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), motor: {$elemMatch: {id: motor.id}}}, {$set: {"motor.$": {...motor}}}, {returnOriginal: false}).then(
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

    async _actBobma(_id: string, bomba: IBomba)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), bomba: {$elemMatch: {id: bomba.id}}}, {$set: {"bomba.$": {...bomba}}}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        );
    }

    async _bajaEquipo(_id: string, id: string, fechaBaja: string, equipo: string)
    {
        const idPrincipal = MotorBombaMutationService.idPrincipal(_id);
        const filtro = nvaProp(equipo, {$elemMatch: {id}});

        const actualizarFecha = nvaProp(`${equipo}.$.fechaRetiro`, fechaBaja);
        const activa = nvaProp(`${equipo}.$.activa`, false);

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            Object.assign(idPrincipal, filtro), {$set: Object.assign(actualizarFecha, activa)}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _evidencia(_id: string, id: string, evidencia: string, esInstalacion: string, equipo: string)
    {
        const idPrincipal = MotorBombaMutationService.idPrincipal(_id);
        const filtro = nvaProp(equipo, {$elemMatch: {id}});

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, Object.assign(idPrincipal, filtro),
            {}, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }

    private static idPrincipal(_id: string): object
    {
        return {_id: new ObjectId(_id)}
    }
}
