import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {IBomba, IMotor} from "../../models/equipo-electrico-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../../services/respuestas-return";
import {nvaProp} from "../../../../../services/definirPropiedades";

export class MotorBombaMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);

    }

    async _regMotor(_id: string, motor: IMotor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)}, {$addToSet: {motor}}, {returnDocument: "after", upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _actMotor(_id: string, motor: IMotor)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), motor: {$elemMatch: {id: motor.id}}}, {$set: {"motor.$": {...motor}}}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _regBobma(_id: string, bomba: IBomba)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id)},
            {$addToSet: {bomba}}, {returnDocument: "after", upsert: true}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _actBobma(_id: string, bomba: IBomba)
    {
        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            {_id: new ObjectId(_id), bomba: {$elemMatch: {id: bomba.id}}}, {$set: {"bomba.$": {...bomba}}}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _bajaEquipo(_id: string, id: string, fechaBaja: string, equipo: string, motivoRetiro: string)
    {
        const idPrincipal = MotorBombaMutationService.idPrincipal(_id);
        const filtro = nvaProp(equipo, {$elemMatch: {id}});

        const actualizarFecha = nvaProp(`${equipo}.$.fechaRetiro`, fechaBaja);
        const activa = nvaProp(`${equipo}.$.activa`, false);
        const motivoRet = nvaProp(`${equipo}.$.motivoRetiro`, motivoRetiro);

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA,
            Object.assign(idPrincipal, filtro), {$set: Object.assign(actualizarFecha, activa, motivoRet)}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    async _evidencia(_id: string, id: string, coleccionImg: Array<string>, esInstalacion: string, equipo: string)
    {
        const idPrincipal = MotorBombaMutationService.idPrincipal(_id);
        const filtro = nvaProp(equipo, {$elemMatch: {id}});

        const coleccion: string = esInstalacion ? "imgEvidenciaInst" : "imgEvidenciaRet";
        const actualizacion = nvaProp(`${equipo}.$.${coleccion}`, {$each: coleccionImg});

        return await this.buscarUnoYActualizar(COLECCION.TELEMETRIA, Object.assign(idPrincipal, filtro),
            {$addToSet: actualizacion}, {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            });
    }

    private static idPrincipal(_id: string): object
    {
        return {_id: new ObjectId(_id)}
    }
}
