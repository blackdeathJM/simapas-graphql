import {buscarElementos, buscarUnElemento, buscarUnoYActualizar, insertarUnElemento} from "../lib/operaciones-db";
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

    protected async busquedaElementoPorID(coleccion: string)
    {
        try
        {
            return await buscarUnElemento(this.context.db!, coleccion, {_id: new ObjectId(this.variables._id)}).then(
                (res) =>
                {
                    console.log('resolver-operations', res);
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

    protected async buscarElementoPersonalizadoFiltro(coleccion: string, filtro: object)
    {
        try
        {
            return await buscarUnElemento(this.context.db!, coleccion, filtro).then(
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

    protected async agregarUnElemento(coleccion: string, documento: object, etiqueta: string)
    {
        try
        {
            return await insertarUnElemento(this.context.db!, coleccion, documento).then(
                (res) =>
                {
                    return {
                        estatus: true,
                        mensaje: `El documento ${etiqueta} se ha agregado correctamente a la coleccion`,
                        elemento: res.ops[0]
                    }
                }
            ).catch(
                (error) =>
                {
                    return {
                        estatus: false,
                        mensaje: `Ha ocurrio un error al tratar de registrar ${etiqueta}: ${error}`,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ha ocurrido un error inesperado al tratar de registrar ${etiqueta}: ${e}`,
                elemento: null
            }
        }
    }

    protected async actualizarUnElemento(coleccion: string, filtro: object, actualizar: object, opciones: object, etiqueta: string)
    {
        try
        {
            return await buscarUnoYActualizar(this.context.db!, coleccion, filtro, actualizar, opciones).then(
                (res) =>
                {
                    return {
                        estatus: true,
                        mensaje: `El documento ${etiqueta} se ha actualizado correctamente`,
                        elemento: res.value
                    }
                }
            ).catch(
                (error) =>
                {
                    return {
                        estatus: false,
                        mensaje: `Ha ocurrido un error al tratar de actualizar ${etiqueta}: ${error}`,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ha ocurrido un error inesperado: ${e}`,
                elemento: null
            }
        }
    }

    protected async eliminarUnElemento(coleccion: string, filtro: object, eliminiar: object, etiquetas: string)
    {}
}

export default ResolversOperacionesService;
