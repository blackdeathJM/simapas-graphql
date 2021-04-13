import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {IOrdenesTrabajo} from "../models/ordenes-trabajo";
import {COLECCION} from "../../../../config/global";
import {respDocumento} from "../../../../services/respuestas-return";

export class OrdenesTrabajoMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _regOrdenTele(ordenTele: IOrdenesTrabajo)
    {
        const ultimoNoOrden = await this.contarDocumentos(COLECCION.ORDENES_TRAB, {noOrden: ordenTele.noOrden}, {});

        ordenTele.noOrden = ultimoNoOrden.total + 1;

        const registro = await this.agregarUnElemento(COLECCION.ORDENES_TRAB, ordenTele, {});

        return respDocumento(registro);
    }
}
