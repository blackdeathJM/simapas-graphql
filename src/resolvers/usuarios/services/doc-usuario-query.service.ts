import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {filtroDocsExt} from "../../presidencia/documentacion/docExt/proyecciones";
import {respArreglosSPag} from "../../../services/respuestas-return";

class DocUsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _doscUsuarioSubproceso(usuario: string, subprocesos: string[])
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario, subproceso: {$in: subprocesos}}}}, {projection: filtroDocsExt},
            {noSeguimiento: -1}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _docsAprobadosUsuario(usuario: string, subproceso: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario, subproceso}}}, {}, {}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }
}

export default DocUsuarioQueryService;
