import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {filtroDocsExt} from "../proyecciones";
import {respArreglosPag, respArreglosSPag} from "../../../../../services/respuestas-return";

class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async _todosDocsExt(proceso: string)
    {
        // Filtrar todos los documentos filtrados por Proceso
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {proceso: {$ne: proceso}}, {}, {noSeguimiento: -1}).then(resultado =>
        {
            return respArreglosSPag(resultado);
        });
    }

    async _docExtProceso(proceso: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {proceso}, {noSeguimiento: -1}, {}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado)
            }
        )
    }

    async _busquedaGral(consulta: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {
                $or: [{noSeguimiento: parseInt(consulta)}, {identificadorDoc: {$regex: consulta, $options: "i"}},
                    {dependencia: {$regex: consulta, $options: "i"}}, {asunto: {$regex: consulta, $options: "i"}},
                    {fechaRecepcion: {$regex: consulta}}, {fechaLimiteEntrega: {$regex: consulta, $options: "i"}},
                    {fechaTerminado: {$regex: consulta, $options: "i"}}]
            },
            {noSeguimiento: -1}, {}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            })
        // return await this.buscar(COLECCION.DOC_EXTERNA, {$text: {$search: valores[0], $caseSensitive: false, $diacriticSensitive : false}},
        // {}, {}).then(
        //     resultado =>
        //     {
        //         return respArreglosPag(resultado);
        //     }
        // )
    }

    async _todosLosDocsPorUsuario(usuario: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {"usuarioDestino": {$elemMatch: {usuario}}}, {noSeguimiento: -1}, {}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }

    async _busquedaEntreFechas(fechaRecepcionInicial: string, fechaRecepcionFinal: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {$and: [{fechaRecepcion: {$gte: fechaRecepcionInicial}}, {fechaRecepcion: {$lte: fechaRecepcionFinal}}]}, {noSeguimiento: -1}, {}).then(
            async resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }
}

export default DocExtQueryService;
