import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {ICliente} from "../models/cliente.interface";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";

export class ClienteMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        {
            super(root, variables, context)
        }
    }

    async _regCliente(cliente: ICliente)
    {
        const buscarDoc = await this.buscarUnElemento(COLECCION.CLIENTES,
            {$or: [{rpu: cliente.rpu}, {folio: cliente.folio}]}, {});

        if (buscarDoc.estatus)
        {
            return respDocumento(buscarDoc);
        } else
        {
            const registroCliente = await this.agregarUnElemento(COLECCION.CLIENTES, cliente, {});
            return respDocumento(registroCliente);
        }

    }
}
