import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";

class ClienteQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: Object, context: IContextData) {super(root, variables, context);}

    async _todosCliente()
    {
        return await this.buscar(COLECCION.CLIENTES, {}, {}, {}).then(
            resultado =>
            {
                // @ts-ignore
                return respArreglosPag(resultado);
            }
        )
    }

}

export default ClienteQueryService;
