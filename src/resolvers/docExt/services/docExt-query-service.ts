import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {filtroDocsExt} from "../proyecciones";

class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async docExtLista()
    {
        const resultado = await this.buscar(COLECCION.DOC_EXTERNA, {}, {});
        return {
            info: {
                pagina: resultado!.info.pagina, paginas: resultado!.info.paginas, elementosPorPagina: resultado!.info.elementosPorPagina,
                total: resultado!.info.total
            },
            estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.elementos
        }
    }

    async docExtListaPorUsuario()
    {
        return await this.buscar(COLECCION.DOC_EXTERNA, {"usuarioDestino": {$elemMatch: this.variables}}, {}).then(
            async resultado =>
            {
                return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.elementos}
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
                return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.elementos}
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
                return {estatus: resultado!.estatus, mensaje: resultado!.mensaje, documentos: resultado!.elementos}
            }
        )
    }
}

export default DocExtQueryService;
