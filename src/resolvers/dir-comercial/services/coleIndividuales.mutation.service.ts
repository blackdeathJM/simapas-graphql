import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {ISolicitudServ} from "../models/coleIndividuales.interface";

export class ColeIndividualesMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _regSolicitudServ(solicitudServ: ISolicitudServ)
    {

    }
}
