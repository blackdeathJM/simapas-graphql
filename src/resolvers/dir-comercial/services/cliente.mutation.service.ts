import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {ICliente, IContrato} from "../models/cliente.interface";
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
        const registroCliente = await this.agregarUnElemento(COLECCION.CLIENTES, cliente, {});
        return respDocumento(registroCliente);
    }
}
