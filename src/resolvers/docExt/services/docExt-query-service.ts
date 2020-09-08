import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {filtroDocsExt} from "../proyecciones";
import {respArreglosPag} from "../../../services/respuestas-return";

class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async docExtLista()
    {
        const resultado = await this.buscar(COLECCION.DOC_EXTERNA, {}, {});
        return respArreglosPag(resultado);
    }

    async docExtListaPorUsuario()
    {
        return await this.buscar(COLECCION.DOC_EXTERNA, {"usuarioDestino": {$elemMatch: {usuario: this.variables.usuario}}}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async doscUsuarioSubproceso()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario: valores[0], subproceso: {$in: valores[1]}}}}, {projection: filtroDocsExt}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async docsAprobadosUsuario()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario: valores[0], subproceso: valores[1]}}}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default DocExtQueryService;
