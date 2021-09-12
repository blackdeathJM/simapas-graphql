import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {respArreglosSPag} from "../../../../../services/respuestas-return";


export class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _criterio(consulta: string)
    {
        const res = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {
                $or: [{noSeguimiento: parseInt(consulta)}, {identificadorDoc: {$regex: consulta, $options: "i"}},
                    {folio: {$regex: consulta, $options: "i"}},
                    {dependencia: {$regex: consulta, $options: "i"}}, {asunto: {$regex: consulta, $options: "i"}},
                    {tipoDoc: {$regex: consulta, $options: "i"}},
                    {fechaRecepcion: {$regex: consulta}}, {fechaLimiteEntrega: {$regex: consulta, $options: "i"}},
                    {fechaTerminado: {$regex: consulta, $options: "i"}}]
            },
            {}, {noSeguimiento: -1});

        return {
            ...res
        }
    }

    async _porUsuario(usuario: string)
    {
        const res = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {usuarioFolio: usuario}, {}, {noSeguimiento: -1});
        return {
            ...res
        }
    }

    async _entreFechas(fechaI: string, fechaF: string)
    {
        const res = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA,
            {$and: [{fechaRecepcion: {$gte: fechaI}}, {fechaRecepcion: {$lte: fechaF}}]}, {}, {noSeguimiento: -1});

        return {
            ...res
        }
    }

    async _porTipo(tipoDoc: string, esInterno: boolean)
    {
        const res = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {tipoDoc, ano: new Date().getFullYear(), esInterno}, {}, {noSeguimiento: -1});
        return {
            ...res
        }
    }

    async _ultimoFolio()
    {
        const ano = new Date().getFullYear();

        const resultado = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {tipoDoc: 'OFICIO', ano, folio: {$ne: null}}, {});

        const res = await this.buscarSinPaginacion(COLECCION.DOC_EXTERNA, {folio: {$regex: resultado.total.toString()}}, {}, {});
        console.log(res);
        return {
            ...res
        }
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
}
