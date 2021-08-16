import ResolversOperacionesService from "../../../../services/resolver-operaciones";
import {COLECCION} from "../../../../config/global";
import {ObjectId} from "bson";
import {respDocumento} from "../../../../services/respuestas-return";
import {IContextData} from "../../../../interfaces/context-data-interface";
import {notTodosDocsExt, notUsuarioSubProceso} from "../../../presidencia/documentacion/docExt/services/docExt-subscription.service";
import {IDocExt, IUsuarioDestinoDocExt} from "../../../presidencia/documentacion/docExt/models/docExt.interface";
import {formatoFolio} from "./funcionesDocs";
import moment from "moment";


class DocUsuarioMutationService extends ResolversOperacionesService
{
    constructor(root: object, context: IContextData)
    {
        super(root, context);
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
            {returnDocument: "after"}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                return respDocumento(resultado)
            }
        )
    }

    async _asigElfolioPorTipoDoc(documento: IDocExt, refDoc: number)
    {
        let buscarElemento: any;
        if (refDoc)
        {
            buscarElemento = await this.buscarUnDocumento(COLECCION.DOC_EXTERNA, {
                noSeguimiento: refDoc, tipoDoc: documento.tipoDoc,
                usuarioDestino: {$elemMatch: {usuario: documento.usuarioFolio}}
            }, {});
            if (!buscarElemento.estatus)
            {
                return respDocumento(buscarElemento);
            }
        }

        documento.ano = new Date().getFullYear();
        const totalDocs = await this.contarDocumentos(COLECCION.DOC_EXTERNA, {tipoDoc: documento.tipoDoc, ano: documento.ano}, {});
        documento.noSeguimiento = totalDocs.total + 1;
        documento.folio = await formatoFolio(documento.folio, documento.tipoDoc, this.context.db!);

        return await this.agregarUnDocumento(COLECCION.DOC_EXTERNA, documento, {}).then(
            async (resultado: any) =>
            {
                if (refDoc)
                {
                    await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(resultado.elemento._id)},
                        {$set: {docUrl: buscarElemento.elemento.docUrl}}, {returnDocument: "after"}).then(
                        async () =>
                        {
                            const extrerFolio = resultado.elemento.folio.split("/");
                            let nvoFolioRef = buscarElemento.elemento.folio + "R " + extrerFolio[3] + " ";
                            let folioGuardar = nvoFolioRef.replace("null", "");

                            await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {
                                    _id: new ObjectId(buscarElemento.elemento._id),
                                    usuarioDestino: {$elemMatch: {usuario: documento.usuarioFolio}}
                                },
                                {$set: {folio: folioGuardar, ref: true}}, {});
                        });
                }
                return respDocumento(resultado);
            }
        )
    }

    async _genFolioRespDoc(_id: string, usuario: string, centroGestor: string)
    {
        const usuarios: string[] = [];
        const resultado = await this.buscarUnDocumento(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)}, {});

        resultado.documento?.usuarioDestino.forEach((u: IUsuarioDestinoDocExt) => usuarios.push(u.usuario));

        const folio = await formatoFolio(centroGestor, 'OFICIO', this.context.db!);

        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA,
            {_id: new ObjectId(_id), usuarioDestino: {$elemMatch: {usuario}}},
            {$set: {folio, usuarioFolio: usuario, proceso: 'TERMINADO', "usuarioDestino.$.subproceso": 'TERMINADO'}},
            {returnDocument: "after"}).then(
            async res =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!);
                await notUsuarioSubProceso(this.context.pubsub!, this.context.db!, usuarios);
                return {
                    ...res
                };
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

        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, filtro, actualizar, {returnDocument: "after"}).then(
            async resultado =>
            {
                await notTodosDocsExt(this.context.pubsub!, this.context.db!)
                return respDocumento(resultado);
            })
    }

    async _terminarDocUsuario(_id: string)
    {
        return await this.buscarUnoYActualizar(COLECCION.DOC_EXTERNA, {_id: new ObjectId(_id)}, {$set: {proceso: 'ENTREGADO'}},
            {returnDocument: "after"}).then(
            resultado =>
            {
                return respDocumento(resultado);
            })
    }
}

export default DocUsuarioMutationService;
