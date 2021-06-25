import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosSPag, respDocumento} from "../../../services/respuestas-return";
import {findIndex} from "lodash";

export class ClienteQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _clientesPorCriterio(criterio: string)
    {
        if (criterio)
        {
            const busquedaCriterio = await this.buscarSinPaginacion(COLECCION.CLIENTES,
                {
                    $or: [{nombreCompleto: {$regex: criterio, $options: "i"}}]
                }, {}, {});
            return respArreglosSPag(busquedaCriterio);
        } else
        {
            return {estatus: false, mensaje: 'no hay datos', elementos: null}
        }
    }

    async _datosRef(noMedidor: string)
    {
        const buscarRef = await this.buscarUnElemento(COLECCION.CLIENTES,
            {contratos: {$elemMatch: {noMedidor: noMedidor}}}, {});

        if (buscarRef.estatus)
        {
            const indice = findIndex(buscarRef.elemento.contratos, (idx: any) => idx.noMedidor === noMedidor);
            buscarRef.elemento.contratos = buscarRef.elemento.contratos.splice(indice, 1)
        }
        return respDocumento(buscarRef);
    }
}
