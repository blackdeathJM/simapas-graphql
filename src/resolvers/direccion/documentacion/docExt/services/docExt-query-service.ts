import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {filtroDocsExt} from "../proyecciones";
import {respArreglosPag} from "../../../../../services/respuestas-return";

class DocExtQueryService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async _docExtLista()
    {
        const resultado = await this.buscar(COLECCION.DOC_EXTERNA, {}, {}, {});
        return respArreglosPag(resultado);
    }

    async _todosLosDocsPorUsuario()
    {
        return await this.buscar(COLECCION.DOC_EXTERNA, {"usuarioDestino": {$elemMatch: {usuario: this.variables.usuario}}},
            {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _doscUsuarioSubproceso()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario: valores[0], subproceso: {$in: valores[1]}}}},
            {projection: filtroDocsExt}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _docsAprobadosUsuario()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {usuarioDestino: {$elemMatch: {usuario: valores[0], subproceso: valores[1]}}}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _docExtProceso()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA, {proceso: valores[0]}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado)
            }
        )
    }

    async _busquedaEntreFechas()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {$and: [{fechaRecepcion: {$gte: valores[0]}}, {fechaRecepcion: {$lte: valores[1]}}]}, {}, {}).then(
            async resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _consultaGral()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.DOC_EXTERNA,
            {
                $or: [{noSeguimiento: parseInt(valores[0])}, {identificadorDoc: {$regex: valores[0], $options: "i"}},
                    {dependencia: {$regex: valores[0], $options: "i"}}, {asunto: {$regex: valores[0], $options: "i"}},
                    {fechaRecepcion: {$regex: valores[0]}}, {fechaLimiteEntrega: {$regex: valores[0], $options: "i"}},
                    {fechaTerminado: {$regex: valores[0], $options: "i"}}]
            },
            {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
        // return await this.buscar(COLECCION.DOC_EXTERNA, {$text: {$search: valores[0], $caseSensitive: false, $diacriticSensitive : false}},
        // {}, {}).then(
        //     resultado =>
        //     {
        //         return respArreglosPag(resultado);
        //     }
        // )
    }
}

export default DocExtQueryService;
