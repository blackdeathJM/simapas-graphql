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
        const regSolicitud = await this.agregarUnElemento(COLECCION.SOLICITUDES, solicitudServ, {});
        return respDocumento(regSolicitud);
    }

    async _aprovRechSolicitud(_id: string, valor: boolean)
    {
        const res = await this.buscarUnoYActualizar(COLECCION.SOLICITUDES,
            {_id: new ObjectId(_id)},
            {$set: {pagoServRealizado: valor, observaciones: 'Preuba de observaciones'}}, {returnDocument: "after"});
        return respDocumento(res);
    }
}
