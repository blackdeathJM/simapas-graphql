import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {ICliente} from "../models/cliente-interface-interface";
import {COLECCION} from "../../../config/global";
import {respDocumento} from "../../../services/respuestas-return";

class ClienteMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData) {super(root, variables, context);}

    async _regCliente(cliente: ICliente)
    {
        return await this.agregarUnElemento(COLECCION.CLIENTES, cliente, {}).then(
            resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }
}

export default ClienteMutationService;
