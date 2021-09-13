import ResolversOperacionesService from "../../../../../services/resolver-operaciones";
import {IContextData} from "../../../../../interfaces/context-data-interface";
import {COLECCION} from "../../../../../config/global";
import {ObjectId} from 'bson';
import {respDocumento} from "../../../../../services/respuestas-return";
import {IDocExt, IUsuarioDestinoDocExt} from "../models/docExt.interface";
import {notUsuarioSubProceso} from "./docExt-subscription.service";
import {UploadService} from "../../../../upload/upload.service";
import {IFileStream} from "../../../../upload/upload.interface";

export class DocExtMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {super(root, context);}

    async _regDocExt(documento: IDocExt, file: Promise<IFileStream[]>, carpeta: string)
    {
        const r = await new UploadService()._subir(file, carpeta);
        if (r.length === 0)
        {
            return {
                estatus: false,
                mesaje: `Hubo un problema con el archivo no se pudo subir al servidor no se pudo continuar con la operacion vuelve a intentarlo mas tarde`,
                documento: null
            }
        }
        documento.ano = new Date().getFullYear();
        documento.docUrl = r[0];

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

    async _quitarUsuario(_id: string, usuario: string)
    {
        const res = await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)},
            {$pull: {"usuarioDestino": {usuario}}}, {returnDocument: "after", sort: {noSeguimiento: -1}});


        // const nvosUsuarios: string[] = [];
        // nvosUsuarios.push(usuario);

        // Subscripcion para quitar el usuario
        // await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, nvosUsuarios);


        return {
            ...res
        }
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
}

