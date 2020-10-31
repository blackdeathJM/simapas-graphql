import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {IOrdenTrabajo} from "../models/orden-trabajo-interface";
import {respDocumento} from "../../../../services/respuestas-return";

class OrdenTrabajoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData) {super(root, variables, context);}

    async _regOrdenTrabajo(ordenTrabajo: IOrdenTrabajo)
    {
        return await this.agregarUnElemento(COLECCION.ORDEN_TRAB, ordenTrabajo, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default OrdenTrabajoMutationService;
