import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {respArreglosSPag} from "../../../../../services/respuestas-return";


class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _todosDocsExt(proceso: string)
    {
        // Filtrar todos los documentos filtrados por Proceso
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {proceso: {$ne: proceso}, esInterno: false}, {}, {noSeguimiento: -1}).then(resultado =>
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
                    {folio: {$regex: consulta, $options: "i"}},
                    {dependencia: {$regex: consulta, $options: "i"}}, {asunto: {$regex: consulta, $options: "i"}},
                    {tipoDoc: {$regex: consulta, $options: "i"}},
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
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {$or: [{usuarioFolio: usuario}, {usuarioDestino: {$elemMatch: {usuario}}}]},
            {noSeguimiento: -1}, {}).then(
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

    async _docPorTipo(tipoDoc: string)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {tipoDoc, ano: new Date().getFullYear()}, {}, {noSeguimiento: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _todosLosDocs()
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {ano: new Date().getFullYear()}, {}, {noSeguimiento: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            }
        )
    }

    async _intOExt(esInterno: any)
    {
        return await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {esInterno, ano: new Date().getFullYear(), tipoDoc: 'OFICIO'}, {},
            {fechaRecepcion: -1}).then(
            resultado =>
            {
                return respArreglosSPag(resultado);
            })
    }

    async _ultimoFolio()
    {
        const ano = new Date().getFullYear();
        const resultado = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {tipoDoc: 'OFICIO', ano, ref: false, folio: {$ne: null}}, {});
        const respusta = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {folio: {$regex: resultado.total?.toString()}}, {}, {});
        return respArreglosSPag(respusta);
    }
}

export default DocExtQueryService;
