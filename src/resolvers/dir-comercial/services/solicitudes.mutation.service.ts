import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";
import {ISolicitudServ} from "../models/solicitudServ.interface";
import {ObjectId} from "bson";

export class SolicitudesMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regSolicitudServ(solicitudServ: ISolicitudServ)
    {
        const regSolicitud = await this.agregarUnDocumento(COLECCION.SOLICITUDES, solicitudServ, {});
        return respDocumento(regSolicitud);
    }

    async _realizarPago(_id: any, valor: any)
    {
        const res = await this.buscarUnoYActualizar(COLECCION.SOLICITUDES,
            {_id: new ObjectId(_id)},
            {$set: {pagoServRealizado: valor}}, {returnDocument: "after"});
        return respDocumento(res);
    }

    async _actualizarSolicitud(_id: string, observaciones: string, aprobadoServ: boolean, ejecutadaPor: string)
    {
        const res = await this.buscarUnoYActualizar(COLECCION.SOLICITUDES,
            {_id: new ObjectId(_id)}, {$set: {observaciones, aprobadoServ, ejecutadaPor}}, {returnDocument: "after"});

        return respDocumento(res);
    }
}
