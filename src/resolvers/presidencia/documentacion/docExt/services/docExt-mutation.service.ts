import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../../services/respuestas-return";
import {IDocExt} from "../models/docExt.interface";
import {notUsuarioSubProceso} from "./docExt-subscription.service";


class DocExtMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {super(root, variables, context);}

    async _regDocExt(documento: IDocExt)
    {
        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {});
        documento.noSeguimiento = totalDocs.total + 1;
        return await this.agregarUnElemento(COLECCION.DOC_EXTERNA, documento, {}).then(
            async resultado =>
            {
                const usuarios: string[] = [];

                await documento.usuarioDestino.forEach(value =>
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

    async darPorEntregado()
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(this.variables._id)},
            {$set: {proceso: "ENTREGADO", "usuarioDestino.$[].subproceso": "ENTREGADO"}}, {returnOriginal: false}).then(
            async resultado =>
            {
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
                return respDocumento(resultado);
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
                    return respDocumento(resultado);
                })
        })
    }
}

export default DocExtMutationService;
