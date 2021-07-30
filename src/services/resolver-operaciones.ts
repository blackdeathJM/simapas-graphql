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
            const res = await this.context.db!.collection(coleccion).find(filtro, opciones).sort(ordenar).toArray();

            if (res.length > 0)
            {
                return {
                    estatus: true,
                    mensaje: 'Varios documentos encontrados correctamente',
                    documentos: res
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: 'Lista de documentos vacia',
                    documentos: []
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Un error inesperado: ${e}`,
                documentos: []
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
                                documentosPorPagina: datosPaginacion.elementosPorPagina,
                                total: datosPaginacion.total
                            },
                            estatus: true,
                            mensaje: 'Lista de documentos cargada correctamente',
                            documentos: resultado
                        }
                    }
                ).catch(
                    async error =>
                    {
                        return {
                            info: {
                                pagina: 0,
                                paginas: 0,
                                documentosPorPagina: 0,
                                total: 0
                            },
                            estatus: false,
                            mensaje: `Error al tratar de cargar los documentos:--> ${error}`,
                            documentos: null
                        }
                    }
                )

        } catch (e)
        {
            return {
                info: {
                    pagina: 0,
                    paginas: 0,
                    documentosPorPagina: 0,
                    total: 0
                },
                estatus: true,
                mensaje: `Ha ocurrido un error inseperado: ${e}`,
                documentos: null
            }
        }
    }

    protected async buscarUnDocumento(coleccion: string, filtro: object, opciones: object)
    {

        try
        {
            const res = await this.context.db?.collection(coleccion).findOne(filtro, opciones);

            if (res)
            {
                return {
                    estatus: true,
                    mensaje: `Documento encontrado correctamentee`,
                    documento: res
                };
            } else
            {
                return {
                    estatus: false,
                    mensaje: `El documento no existe`,
                    documento: null
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Error al buscar el documento en la coleccion: ${e}`,
                documento: null
            }
        }
    }

    protected async agregarUnDocumento(coleccion: string, documento: object, opciones: object)
    {
        try
        {
            const res = await this.context.db!.collection(coleccion).insertOne(documento, opciones);

            if (res.acknowledged)
            {
                return {
                    estatus: true,
                    mensaje: `Un documento se ha insertado correctamente`,
                    documento: documento
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: `No se pudo registrar el documento vuelve internarlo mas tarde`,
                    documento: null
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ocurrio un error inesperado: ${e}`,
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
    //                 documento: res.ops
    //             }
    //         }).catch((e) =>
    //         {
    //             return {
    //                 estatus: false,
    //                 mensaje: e,
    //                 documento: null
    //             }
    //         })
    //     } catch (e)
    //     {
    //         return {
    //             estatus: false,
    //             mensaje: 'Ocurrio un error inesperado al tratar de registrar los multiples documentos',
    //             documento: null
    //         }
    //     }
    // }

    protected async buscarUnoYActualizar(coleccion: string, filtro: object, actualizar: object, opciones: object)
    {

        try
        {
            const res = await this.context.db!.collection(coleccion).findOneAndUpdate(filtro, actualizar, opciones);
            if (res.ok === 1)
            {
                return {
                    estatus: true,
                    mensaje: `Documento actualizado con exito`,
                    documento: res.value
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: `no se puedo actualizar el documento`,
                    documento: null
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Ha ocurrido un error inesperado: ${e}`,
                documento: null
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
            const res = await this.context.db!.collection(coleccion).findOneAndDelete(filtro, opciones);

            if (res.ok === 1)
            {
                return {
                    estatus: true,
                    mensaje: `El documento se ha eliminado correctamente`,
                    documento: res.value
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: `Ocurrio un error al momento de tratar un documento`,
                    documento: null
                }
            }
        } catch (e)
        {
            return {
                estatus: false,
                mensaje: `Error inesperado: ${e}`,
                documento: null
            }
        }
    }

    protected async contarDocumentos(coleccion: string, consulta: object, opciones: object)
    {

        try
        {
            const res = await this.context.db!.collection(coleccion).countDocuments(consulta, opciones);

            if (res !== 0 || res !== undefined)
            {
                return {
                    estatus: true,
                    mensaje: 'Conteo correcto de documentos',
                    total: res
                }
            } else
            {
                return {
                    estatus: false,
                    mensaje: 'No se encontraron documentos',
                    total: 0
                }
            }
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
