import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {respArreglosPag} from "../../../services/respuestas-return";

class FolioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, contexto: IContextData)
    {super(root, variables, contexto);}

    async _obtenerFolios()
    {
        return await this.buscar(COLECCION.FOLIOS, {}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _ultimoFolioRegistrado()
    {
        return await this.contarDocumentos(COLECCION.FOLIOS, {}).then(
            async resultado =>
            {
                return resultado.total
            }
        )
    }

    async _folioUsuario()
    {
        const valores = Object.values(this.variables)
        return await this.buscar(COLECCION.FOLIOS, {asigUsuario: valores[0]}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _folUsuarioProceso()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.FOLIOS, {asigUsuario: valores[0], proceso: valores[1]}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default FolioQueryService;
