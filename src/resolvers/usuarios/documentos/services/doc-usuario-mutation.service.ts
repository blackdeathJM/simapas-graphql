import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../services/respuestas-return";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {notTodosDocsExt, notUsuarioSubProceso} from "../../../presidencia/documentacion/docExt/services/docExt-subscription.service";
import {IDocExt, IUsuarioDestinoDocExt} from "../../../presidencia/documentacion/docExt/models/docExt.interface";
import moment from "moment";
import {formatoFolio} from "./funcionesDocs";


class DocUsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, variables: object, context: IContextData)
    {
        super(root, variables, context);
    }

    async _acDocUrlEnUsuarioDestino(_id: string, usuario: string, docUrl: string, subproceso: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {
                $set: {
                    notificarAdministrador: true, "usuarioDestino.$.docUrl": docUrl, "usuarioDestino.$.subproceso": subproceso,
                    "usuarioDestino.$.notificarRespDelUsuario": true
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

    async _asigElfolioPorTipoDoc(documento: IDocExt)
    {
        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {}, {});
        documento.noSeguimiento = totalDocs.total + 1;

        documento.ano = String(new Date().getFullYear());
        documento.folio = await formatoFolio(documento.folio, documento.tipoDoc, this.context.db!);

        return await this.agregarUnElemento(COLECCION.DOC_EXTERNA, documento, {}).then(
            async resultado =>
            {
                return respDocumento(resultado);
            }
        )
    }

    async _genFolioRespDoc(_id: string, usuario: string, centroGestor: string)
    {
        const usuarios: string[] = [];
        const resultado = await this.buscarUnElemento(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)}, {});

        resultado.elemento.usuarioDestino.forEach((u: IUsuarioDestinoDocExt) => usuarios.push(u.usuario));

        const folio = await formatoFolio(centroGestor, 'OFICIO', this.context.db!);

        const ano = String(new Date().getFullYear());

        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario, subproceso: 'APROBADO'}}},
            {$set: {folio, usuarioFolio: usuario, ano, proceso: 'TERMINADO', "usuarioDestino.$.subproceso": 'TERMINADO'}},
            {returnOriginal: false}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
                return respDocumento(resultado);
            });
    }

    async _docRespUrlAcuseUrl(_id: string, documento: string, proceso: string, usuario: string, esInterno: boolean, esDocRespUrl: boolean)
    {
        let filtro: {};
        let actualizar: {};
        const fechaTerminado = moment().toISOString();
        if (esDocRespUrl)
        {
            if (esInterno)
            {
                filtro = {_id: new ObjectId(_id)};
                actualizar = {$set: {docRespUrl: documento, proceso, fechaTerminado}};
            } else
            {
                filtro = {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}};
                actualizar = {$set: {docRespUrl: documento, proceso, fechaTerminado, "usuarioDestino.$.subproceso": proceso}};
            }
        } else
        {
            if (esInterno)
            {
                filtro = {_id: new ObjectId(_id)};
                actualizar = {$set: {acuseUrl: documento, proceso, fechaTerminado}};
            } else
            {
                filtro = {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}};
                actualizar = {$set: {acuseUrl: documento, proceso, fechaTerminado, "usuarioDestino.$.subproceso": proceso}};
            }
        }

        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, filtro, actualizar, {returnOriginal: false}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!)
                return respDocumento(resultado);
            })
    }

    async _terminarDocUsuario(_id: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)}, {$set: {proceso: 'ENTREGADO'}},
            {returnOriginal: false}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }
}

export default DocUsuarioMutationService;
