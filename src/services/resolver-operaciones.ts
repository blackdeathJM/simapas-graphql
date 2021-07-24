import {IContextData} from "../interfaces/context-data-interface";
import {paginacion} from "../lib/paginacion";
import {IPaginacion} from "../interfaces/paginacion-interface";
import {Sort} from "mongodb";

class ResolversOperacionesService
{
    paginacion: IPaginacion | undefined;

    constructor(public root: object, public context: IContextData)
    {
    }

    protected async buscarSinPaginacion(coleccion: string, filtro: object, opciones: object, ordenar: Sort)
    {
        try
        {
            return await this.context.db!.collection(coleccion).find(filtro, opciones).sort(ordenar).toArray().then(
                async resultado =>
                {
                    return {
                        estatus: true,
                        mensaje: 'Lista de documentos cargada correctamente',
                        elementos: resultado
                    }
                }
            ).catch(
                async error =>
                {
                    return {
                        estatus: false,
                        mensaje: `Error al tratar de cargar los documentos:--> ${error}`,
                        elementos: null
                    }
                }
            )

        } catch (e)
        {
            return {
                estatus: true,
                mensaje: `Ha ocurrido un error inseperado: ${e}`,
                elementos: null
            }
        }
    }

    protected async buscar(coleccion: string, filtro: object, opciones: object, ordenar: Sort)
    {
        try
        {
            const datosPaginacion = await paginacion(this.context.db!, coleccion, this.paginacion!.pagina,
                this.paginacion!.elementosPorPagina, filtro);
            return await this.context.db!.collection(coleccion).find(filtro, opciones).limit(datosPaginacion.elementosPorPagina)
                .skip(datosPaginacion.saltar).sort(ordenar).toArray().then(
                    async resultado =>
                    {
                        return {
                            info: {
                                pagina: datosPaginacion.pagina,
                                paginas: datosPaginacion.paginas,
                                saltar: datosPaginacion.saltar,
                                elementosPorPagina: datosPaginacion.elementosPorPagina,
                                total: datosPaginacion.total
                            },
                            estatus: true,
                            mensaje: 'Lista de documentos cargada correctamente',
                            elementos: resultado
                        }
                    }
                ).catch(
                    async error =>
                    {
                        return {
                            info: {
                                pagina: 0,
                                paginas: 0,
                                elementosPorPagina: 0,
                                total: 0
                            },
                            estatus: false,
                            mensaje: `Error al tratar de cargar los documentos:--> ${error}`,
                            elementos: null
                        }
                    }
                )

        } catch (e)
        {
            return {
                info: {
                    pagina: 0,
                    paginas: 0,
                    elementosPorPagina: 0,
                    total: 0
                },
                estatus: true,
                mensaje: `Ha ocurrido un error inseperado: ${e}`,
                elementos: null
            }
        }
    }

    protected async buscarUnElemento(coleccion: string, filtro: object, opciones: object)
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
                            mensaje: `Documento encontrado correctamentee`,
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
                    mensaje: `Error al buscar el documento en la coleccion: ${e}`,
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

    protected async agregarUnElemento(coleccion: string, documento: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).insertOne(documento, opciones).then(
                (res) =>
                {
                    console.log('agregar', res);
                    return {
                        estatus: true,
                        mensaje: `Un documento se ha insertado correctamente`,
                        elemento: null
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

    // protected async agregarVarios(coleccion: string, documento: object[], opciones: object)
    // {
    //     try
    //     {
    //         return await this.context.db!.collection(coleccion).insertMany(documento, opciones).then((res) =>
    //         {
    //             console.log('respuesta', res);
    //             return {
    //                 estatus: true,
    //                 mensaje: 'Documentos insertados correctamente',
    //                 elemento: res.ops
    //             }
    //         }).catch((e) =>
    //         {
    //             return {
    //                 estatus: false,
    //                 mensaje: e,
    //                 elemento: null
    //             }
    //         })
    //     } catch (e)
    //     {
    //         return {
    //             estatus: false,
    //             mensaje: 'Ocurrio un error inesperado al tratar de registrar los multiples documentos',
    //             elemento: null
    //         }
    //     }
    // }

    protected async buscarUnoYActualizar(coleccion: string, filtro: object, actualizar: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).findOneAndUpdate(filtro, actualizar, opciones).then(
                (res) =>
                {
                    return {
                        estatus: true,
                        mensaje: `El documento fue actualizado con exito`,
                        elemento: res.value
                    }
                }
            ).catch(
                (error) =>
                {
                    return {
                        estatus: false,
                        mensaje: `Error al tratar de actualizar el documento: ${error}`,
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

    protected async agregacion(coleccion: string, agregacion: object[])
    {
        return this.context.db?.collection(coleccion).aggregate(agregacion).toArray();
    }

    protected async buscarUnoYEliminar(coleccion: string, filtro: object, opciones: object)
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

    protected async contarDocumentos(coleccion: string, consulta: object, opciones: object)
    {
        try
        {
            return await this.context.db!.collection(coleccion).countDocuments(consulta, opciones).then(
                async respuesta =>
                {
                    return {
                        estatus: true,
                        mensaje: 'Conteo correcto de documentos',
                        total: respuesta
                    }
                }
            ).catch(
                async error =>
                {
                    return {
                        estatus: false,
                        mensaje: 'Error al contar los doucmentos: ' + error,
                        total: 0
                    }
                }
            );
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: 'Error inesperado: ' + e,
                total: 0
            }
        }
    }
}

export default ResolversOperacionesService;
