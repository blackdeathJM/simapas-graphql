import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../../services/respuestas-return";
import {IDocExt, IUsuarioDestinoDocExt} from "../models/docExt.interface";
import {notUsuarioSubProceso} from "./docExt-subscription.service";

class DocExtMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async _regDocExt(documento: IDocExt)
    {
        documento.ano = new Date().getFullYear();
        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {tipoDoc: documento.tipoDoc, ano: documento.ano}, {});
        documento.noSeguimiento = totalDocs.total + 1;

        return await this.agregarUnElemento(COLECCION.DOC_EXTERNA, documento, {}).then(
            async resultado =>
            {
                const usuarios: string[] = [];
                documento.usuarioDestino.forEach(value =>
                {
                    usuarios.push(value.usuario);
                });
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
                return respDocumento(resultado);
            }
        )
    }

    async _desactivarNot(_id: string, usuario: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {$set: {notificarAdministrador: false, "usuarioDestino.$.notificarRespDelUsuario": false}}, {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }

    async _aprobarRechazarDoc(_id: string, usuario: string, subproceso: string, observaciones: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {
                $set: {
                    "usuarioDestino.$.subproceso": subproceso, "usuarioDestino.$.observaciones": observaciones
                }
            },
            {returnOriginal: false}).then(
            async resultado =>
            {
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, [usuario]);
                return respDocumento(resultado);
            }
        )
    }

    async _darPorEntregado(_id: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)},
            {$set: {proceso: "ENTREGADO", "usuarioDestino.$[].subproceso": "ENTREGADO"}}, {returnOriginal: false}).then(
            async resultado =>
            {
                const usuarios: string[] = [];
                resultado.elemento.usuarioDestino.forEach((u: IUsuarioDestinoDocExt) =>
                {
                    usuarios.push(u.usuario);
                });
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
                return respDocumento(resultado)
            }
        )
    }

    async _acInfoDoc(documento: IDocExt)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(documento._id)},
            {
                $set: {
                    identificadorDoc: documento.identificadorDoc, asunto: documento.asunto, dependencia: documento.dependencia,
                    comentario: documento.comentario, fechaRecepcion: documento.fechaRecepcion, fechaLimiteEntrega: documento.fechaLimiteEntrega
                }
            },
            {returnOriginal: false}).then(async () =>
        {
            return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(documento._id)},
                {$addToSet: {usuarioDestino: {$each: documento.usuarioDestino}}},
                {returnOriginal: false}).then(
                async resultado =>
                {
                    const usuarios: string[] = [];
                    documento.usuarioDestino.forEach(u => usuarios.push(u.usuario));
                    await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
                    return respDocumento(resultado);
                })
        })
    }

    async _quitarUsuario(_id: string, usuario: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)},
            {$pull: {"usuarioDestino": {usuario}}}, {returnOriginal: false, sort: {noSeguimiento: -1}}).then(
            async resultado =>
            {
                const nvosUsuarios: string[] = [];
                nvosUsuarios.push(usuario);
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, nvosUsuarios);
                return respDocumento(resultado);
            })
    }
}

export default DocExtMutationService;
