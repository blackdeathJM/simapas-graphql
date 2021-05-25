import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {filtroDocsExt} from "../../../presidencia/documentacion/docExt/proyecciones";
import {respArreglosSPag} from "../../../../services/respuestas-return";

class DocUsuarioQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
    }

    async _doscUsuarioSubproceso(usuario: string, subprocesos: string[])
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {folio: {$eq: null}, usuarioDestino: {$elemMatch: {usuario, subproceso: {$in: subprocesos}}}}, {projection: filtroDocsExt},
            {noSeguimiento: -1}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _docsPendFolIntExt(usuarioFolio: string)
    {
        // {usuarioFolio, $or: [{docRespUrl: null}, {acuseUrl: null}]}
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {usuarioFolio, proceso: {$ne: 'ENTREGADO'}, $or: [{docRespUrl: null}, {acuseUrl: null}]}, {},
            {noSeguimiento: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }

    async _busquedaGralUsuario(usuario: string, consulta: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {
                usuarioFolio: usuario,
                $or: [{noSeguimiento: parseInt(consulta)}, {identificadorDoc: {$regex: consulta, $options: "i"}},
                    {dependencia: {$regex: consulta, $options: "i"}}, {asunto: {$regex: consulta, $options: "i"}},
                    {fechaRecepcion: {$regex: consulta}}, {fechaLimiteEntrega: {$regex: consulta, $options: "i"}},
                    {tipoDoc: {$regex: consulta, $options: "i"}}, {fechaTerminado: {$regex: consulta, $options: "i"}}]
            },
            {noSeguimiento: -1}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _docUsuarioTipoDoc(usuarioFolio: string, tipoDoc: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {usuarioFolio, tipoDoc, proceso: 'ENTREGADO'},
            {}, {noSeguimiento: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _docUsuarioExtEntregado(usuarioFolio: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {usuarioFolio, proceso: 'ENTREGADO', esInterno: false}, {}, {noSeguimiento: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            });
    }
}

export default DocUsuarioQueryService;
