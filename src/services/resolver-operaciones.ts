import {buscarElementos, buscarUnElemento} from "../lib/operaciones-db";
import {IVariables} from "../interfaces/variables-interface";
import {IContextData} from "../interfaces/context-data-interface";
import {ObjectId} from "bson";

class ResolversOperacionesService
{
    constructor(public root: object, public variables: IVariables, public context: IContextData)
    {
    }

    protected async lista(coleccion: string, element: string)
    {
        try
        {
            return await buscarElementos(this.context.db!, coleccion).then(
                async (elementos) =>
                {
                    return {
                        estatus: true,
                        mensaje: `Lista de ${element} cargada correctamente`,
                        elementos: elementos,
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

    protected async detalleElemento(coleccion: string)
    {
        try
        {
            return await buscarUnElemento(this.context.db!, coleccion, {_id: new ObjectId(this.variables._id)}).then(
                (res) =>
                {
                    if (res)
                    {
                        return {
                            estatus: true,
                            mensaje: `los ${coleccion} ha sido cargada correctamente`,
                            elemento: res
                        };
                    }
                }
            ).catch((e) =>
            {
                return {
                    estatus: false,
                    mensaje: `Los ${coleccion} no se han obtenido verifica tus parametros de consulta`,
                    elemento: null
                }
            });
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ha ocurrido un error inesperado: ${e}`,
                elemento: null
            }
        }
    }
}

export default ResolversOperacionesService;
