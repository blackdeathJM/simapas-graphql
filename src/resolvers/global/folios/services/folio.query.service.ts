import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../config/global";
import {respArreglosPag} from "../../../../services/respuestas-return";

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

    async _folEntreFechasUsuario()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.FOLIOS,
            {$and: [{asigUsuario: valores[2]}, {fechaCreacion: {$gte: valores[0]}}, {fechaCreacion: {$lte: valores[1]}}]},
            {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _folEntreFechas()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.FOLIOS,
            {$and: [{fechaCreacion: {$gte: valores[0]}}, {fechaCreacion: {$lte: valores[1]}}]},
            {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _folConsultaGralUsuario()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.FOLIOS,
            {
                $and: [{asigUsuario: valores[1]}, {
                    $or: [{titulo: {$regex: valores[0], $options: "i"}}, {folio: {$regex: valores[0], $options: "i"}},
                        {tipo: valores[0]}, {descripcion: {$regex: valores[0], $options: "i"}}]
                }]
            }, {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }

    async _folConsultaGral()
    {
        const valores = Object.values(this.variables);
        return await this.buscar(COLECCION.FOLIOS,
            {
                $or: [{titulo: {$regex: valores[0], $options: "i"}}, {folio: {$regex: valores[0], $options: "i"}},
                    {tipo: valores[0]}, {descripcion: {$regex: valores[0], $options: "i"}}]
            }, {}, {}).then(
            resultado =>
            {
                return respArreglosPag(resultado);
            }
        )
    }
}

export default FolioQueryService;
