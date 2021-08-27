import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../../services/respuestas-return";
import {IDocExt, IUsuarioDestinoDocExt} from "../models/docExt.interface";
import {notUsuarioSubProceso} from "./docExt-subscription.service";
import {UploadService} from "../../../../upload/upload.service";

export class DocExtMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _regDocExt(documento: IDocExt, archivo: any, carpeta: string)
    {
        // const r = await new UploadService()._subir(archivo, documento.);

        documento.ano = new Date().getFullYear();

        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {tipoDoc: documento.tipoDoc, ano: documento.ano}, {});
        documento.noSeguimiento = totalDocs.total + 1;

        const res = await this.agregarUnDocumento(COLECCION.DOC_EXTERNA, documento, {});
        const usuarios: string[] = [];

        documento.usuarioDestino.forEach(value =>
        {
            usuarios.push(value.usuario);
        });

        await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
        return {
            ...res
        }

    }

    async _desactivarNot(_id: string, usuario: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {$set: {notificarAdministrador: false, "usuarioDestino.$.notificarRespDelUsuario": false}}, {returnDocument: "after"}).then(
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
            {returnDocument: "after"}).then(
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
            {$set: {proceso: "ENTREGADO", "usuarioDestino.$[].subproceso": "ENTREGADO"}}, {returnDocument: "after"}).then(
            async resultado =>
            {
                const usuarios: string[] = [];
                resultado.documento?.usuarioDestino.forEach((u: IUsuarioDestinoDocExt) =>
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
            {returnDocument: "after"}).then(async () =>
        {
            return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(documento._id)},
                {$addToSet: {usuarioDestino: {$each: documento.usuarioDestino}}},
                {returnDocument: "after"}).then(
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
            {$pull: {"usuarioDestino": {usuario}}}, {returnDocument: "after", sort: {noSeguimiento: -1}}).then(
            async resultado =>
            {
                const nvosUsuarios: string[] = [];
                nvosUsuarios.push(usuario);
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, nvosUsuarios);
                return respDocumento(resultado);
            })
    }
}

