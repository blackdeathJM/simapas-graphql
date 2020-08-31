import {buscarElementos} from "../lib/operaciones-db";
import {IVariables} from "../interfaces/variables-interface";
import {IContextData} from "../interfaces/context-data-interface";

class ResolversOperacionesService
{
    constructor(public root: object, public variables: IVariables, public context: IContextData)
    {
    }

    protected obtenerContext(): IContextData {return this.context;}

    protected obternerVariables(): IVariables {return this.variables}

    protected async lista(coleccion: string, element: string)
    {
        try
        {
            return await buscarElementos(this.obtenerContext().db!, coleccion).then(
                async (deptos) =>
                {
                    return {
                        estatus: true,
                        mensaje: `Lista de ${element} cargada correctamente`,
                        elementos: deptos,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `No se pudo cargar la lista de ${element}: ${e}`,
                elementos: null,
                elemento: null,
            }
        }
    }
}

export default ResolversOperacionesService;
