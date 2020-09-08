import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosPag} from "../../../services/respuestas-return";

class FolioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, contexto: IContextData)
    {super(root, variables, contexto);}

    async obtenerFolios()
    {
        return await this.buscar(COLECCION.FOLIOS, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async ultimoFolioRegistrado()
    {
        return await this.contarDocumentos(COLECCION.FOLIOS, {}).then(
            async resultado =>
            {
                return resultado.total
            }
        )
    }

    async folioUsuario()
    {
        return await this.buscar(COLECCION.FOLIOS, this.variables, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default FolioQueryService;
