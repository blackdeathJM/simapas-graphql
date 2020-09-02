import {IVariables} from "../interfaces/variables-interface";
import {IContextData} from "../interfaces/context-data-interface";

class ResolversOperacionesService
{
    constructor(public root: object, public variables: IVariables, public context: IContextData)
    {
    }

    protected async buscar(mensaje: string, coleccion: string, filtro: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).find(filtro).toArray().then(
                async (elementos) =>
                {
                    return {
                        estatus: true,
                        mensaje: `Lista de ${mensaje} cargada correctamente`,
                        elementos: elementos
                    }
                }
            ).catch(
                error =>
                {
                    return {
                        estatus: false,
                        mensaje: `Ocurrio un error al cargar los documentos: ${error}`,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `No se pudo cargar la lista de ${mensaje}: ${e}`,
                elementos: null
            }
        }
    }

    protected async buscarUnElemento(mensaje: string, coleccion: string, filtro: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).findOne(filtro, opciones).then(
                (res) =>
                {
                    if (res)
                    {
                        return {
                            estatus: true,
                            mensaje: `El documento ya existe`,
                            elemento: res
                        };
                    } else
                    {
                        return {
                            estatus: false,
                            mensaje: `El documento no existe`,
                            elemento: null
                        }
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

    protected async agregarUnElemento(mensaje: string, coleccion: string, documento: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).insertOne(documento).then(
                (res) =>
                {
                    return {
                        estatus: true,
                        mensaje: `Un documento se ha insertado correctamente`,
                        elemento: res.ops[0]
                    }
                }
            ).catch(
                (error) =>
                {
                    return {
                        estatus: false,
                        mensaje: `Ha ocurrido un error al tratar de insertar el documento: ${error}`,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ha ocurrido un error inesperado al tratar de registrar: ${e}`,
                elemento: null
            }
        }
    }

    protected async buscarUnoYActualizar(mensaje: string, coleccion: string, filtro: object, actualizar: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).findOneAndUpdate(filtro, actualizar, opciones).then(
                (res) =>
                {
                    return {
                        estatus: true,
                        mensaje: `${mensaje}`,
                        elemento: res.value
                    }
                }
            ).catch(
                (error) =>
                {
                    return {
                        estatus: false,
                        mensaje: `${mensaje}: ${error}`,
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

    protected async buscarUnoYEleminiar(coleccion: string, filtro: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).findOneAndDelete(filtro, opciones).then(
                async res =>
                {
                    if (res.ok === 1)
                    {
                        return {
                            estatus: true,
                            mensaje: `El documento se ha eliminado correctamente`,
                            elemento: res.value
                        }
                    } else
                    {
                        return {
                            estatus: false,
                            mensaje: `Ocurrio un error al momento de tratar un documento`,
                            elemento: null
                        }
                    }
                }
            ).catch(
                async error =>
                {
                    return {
                        estatus: false,
                        mensaje: `Ocurrio un error insperardo: ${error}`,
                        elemento: null
                    }
                }
            )
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Error inesperado: ${e}`,
                elemento: null
            }
        }
    }
}

export default ResolversOperacionesService;
