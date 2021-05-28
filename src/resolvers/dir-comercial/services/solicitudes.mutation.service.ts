import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";
import {ISolicitudServ} from "../models/solicitudServ.interface";

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
}
