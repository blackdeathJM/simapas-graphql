import ResolversOperacionesService from "../../../services/resolver-operaciones";
import {IContextData} from "../../../interfaces/context-data-interface";
import {COLECCION, PUB_SUB} from "../../../config/global";
import {PubSub} from "apollo-server-express";
import {Db} from "mongodb";
import {ObjectId} from 'bson';


async function notTodosDocsExt(pubsub: PubSub, db: Db)
{
    const resultado = db.collection(COLECCION.DOC_EXTERNA).find().toArray();
    return await pubsub.publish(PUB_SUB.DOC_EXT, {todosDocsExtSub: resultado});
}

async function notActUsuarioSubProceso(pubsub: PubSub, db: Db, contexto: any)
{
    const resultado = await db.collection(COLECCION.DOC_EXTERNA).find(
        {usuarioDestino: {$elemMatch: {subproceso: {$in: JSON.parse(contexto)}}}}).toArray();

    return await pubsub.publish(PUB_SUB.DOC_EXT_USUSUBPROCESO, {pubsubSubproceso: resultado});
}

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
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, documento: resultado.elemento}
            }
        )
    }

    async actualizarDocExtUrl()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0])},
            {$set: {docUrl: valores[1], proceso: valores[2], "usuarioDestino.$[].notificarUsuario": true}},
            {}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, documento: resultado.elemento}
            }
        );
    }

    async actualizarDocUrlUsuarioDestino()
    {
        const valores = Object.values(this.variables);
        // Aumentamos na notificacion del administrador en 1
        const notificacionesAdminitrador = await this.buscarUnElemento(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0])},
            {});
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
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, documento: resultado.elemento}
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
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, documento: resultado.elemento}
            }
        )
    }

    async aprobarDocumento()
    {
        const valores = Object.values(this.variables);
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(valores[0]), usuarioDestino: {$elemMatch: {usuario: valores[1]}}},
            {$set: {"usuarioDestino.$.subproceso": valores[2], "usuarioDestino.$.autorizado": valores[3]}},
            {returnOriginal: false}).then(
            async resultado =>
            {
                await notActUsuarioSubProceso(this.context.pubsub!, this.context.db!, this.context.contexto!);
                return {estatus: resultado.estatus, mensaje: resultado.mensaje, documento: resultado.elemento}
            }
        )
    }
}

export default DocExtMutationService;
