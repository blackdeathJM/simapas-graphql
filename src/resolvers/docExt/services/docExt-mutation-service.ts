import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION} from "../../../config/global";
import {ObjectId} from 'bson';
import {notActUsuarioSubProceso, notTodosDocsExt} from "./docExt-subscription";
import {respDocumento} from "../../../services/respuestas-return";


class DocExtMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async agregarDocExt()
    {
        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {});
        this.variables.docExt!.noSeguimiento = totalDocs.total + 1;
        return await this.agregarUnElemento(COLECCION.DOC_EXTERNA, this.variables.docExt!, {}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return respDocumento(resultado);
            }
        )
    }

    async actualizarDocExtUrl()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0])},
            {$set: {docUrl: valores[1], proceso: valores[2], "usuarioDestino.$[].notificarUsuario": true}}, {}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return respDocumento(resultado);
            }
        );
    }

    async actualizarDocUrlUsuarioDestino()
    {
        const valores = Object.values(this.variables);
        // Aumentamos na notificacion del administrador en 1
        const notificacionesAdminitrador = await this.buscarUnElemento(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0])}, {});
        let totalNotificaciones = notificacionesAdminitrador.elemento.notificarAdministrador + 1;
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0]), usuarioDestino: {$elemMatch: {usuario: valores[1]}}},
            {
                $set: {
                    notificarAdministrador: totalNotificaciones, "usuarioDestino.$.docUrl": valores[2],
                    "usuarioDestino.$.subproceso": valores[3], "usuarioDestino.$.notificarRespDelUsuario": true
                }
            },
            {returnOriginal: false}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                return respDocumento(resultado)
            }
        )
    }

    async acNoticiacionPorUsuario()
    {
        const valores = Object.values(this.variables);
        const totalNotAdministrador = await this.buscarUnElemento(COLECCION.DOC_EXTERNA, {_id: new ObjectId(valores[0])},
            {projection: {_id: 0, notificarAdministrador: 1}});
        let totalNotAdmin = totalNotAdministrador.elemento.notificarAdministrador + valores[3];
        if (totalNotAdmin < 0)
        {
            totalNotAdmin = 0;
        }
        // Apagamos la notificacion del usuario
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0]), usuarioDestino: {$elemMatch: {usuario: valores[1]}}},
            {$set: {notificarAdministrador: totalNotAdmin, "usuarioDestino.$.notificarRespDelUsuario": valores[2]}},
            {returnOriginal: false}).then(
            async () =>
            {
                return true
            }
        )
    }

    async observacionesRechazarDocExt()
    {
        const valores = Object.values(this.variables)
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0]), usuarioDestino: {$elemMatch: {usuario: valores[1]}}},
            {
                $set: {
                    "usuarioDestino.$.subproceso": valores[2], "usuarioDestino.$.notificarRespDelUsuario": valores[3],
                    "usuarioDestino.$.observaciones": valores[4]
                }
            },
            {returnOriginal: false}).then(
            async resultado =>
            {
                // await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return respDocumento(resultado);
            }
        )
    }

    async aprobarDocumento()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0]), usuarioDestino: {$elemMatch: {usuario: valores[1]}}},
            {$set: {"usuarioDestino.$.subproceso": valores[2], "usuarioDestino.$.autorizado": valores[3]}}, {returnOriginal: false}).then(
            async resultado =>
            {
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return respDocumento(resultado)
            }
        )
    }

    async darPorEntregado()
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(this.variables._id)},
            {$set: {proceso: "ENTREGADO", "usuarioDestino.$[].subproceso": "ENTREGADO"}}, {}).then(
            async resultado =>
            {
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto);
                return respDocumento(resultado)
            }
        )
    }

    async _acuse()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(valores[0])},
            {
                $set: {
                    acuseUrl: valores[1], proceso: valores[2], "usuarioDestino.$[].subproceso": valores[2],
                    "usuarioDestino.$[].notificarRespDelUsuario": false, "usuarioDestino.$[].notificarUsuario": false
                }
            },
            {}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                return respDocumento(resultado);
            }
        )
    }
}

export default DocExtMutationService;
