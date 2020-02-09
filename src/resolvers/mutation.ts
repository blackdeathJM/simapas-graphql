import {IResolvers} from "graphql-tools";
import {acDepto, regDepto} from "../operaciones/mutations/departamento.mutation";
import {acPerfilUsuario, regUsuario} from "../operaciones/mutations/usuario.mutation";
import {acUrlFolio, registrarFolio} from "../operaciones/mutations/folio.mutation";
import {
    acDocExtEstatusGralDocRepUrlFolio,
    acEstatusGralEstatusUsuarioTerminado,
    acEstEstGralFolioUsuario,
    actObsEstaPorUsuDocExt,
    acUrlDocExt,
    acUrlDocExtUsuario,
    registroDoc
} from "../operaciones/mutations/docExterna.mutation";
import {acVistoUsuario, agDocumentoInterno} from "../operaciones/mutations/docInterna.mutation";

const mutation: IResolvers =
    {
        Mutation:
            {
                // DEPARTAMENTO
                async registroDepto(_: void, {departamento}, {pubsub, db})
                {
                    return await regDepto(departamento, pubsub, db);
                },
                async actualizarDepto(_: void, {nombreDeptoActualizar}, {db})
                {
                    return await acDepto(nombreDeptoActualizar._id, nombreDeptoActualizar.nombre, db);
                },
                // USUARIO
                async registroUsuario(_: void, {usuario}, {db})
                {
                    return await regUsuario(usuario, db);
                },
                async actualizarUsuario(_: void, {usuario}, {db})
                {
                    return await acPerfilUsuario(usuario.usuario, usuario.nombre, usuario.img, db);
                },
                // FOLIO
                async registroFolio(_: void, {folio}, {db})
                {
                    return await registrarFolio(folio, db);
                },
                async acUrlFolio(_: void, {id, archivoUrl}, {db})
                {
                    return await acUrlFolio(id, archivoUrl, db);
                },
                // ========================DOCUMENTACION EXTERNA============================
                async regDocExterno(_: void, {regDoc}, {pubsub, db})
                {
                    return await registroDoc(regDoc, pubsub, db);
                },
                async acDocExtUrlGral(_: void, {id, docUrl}, {pubsub, db})
                {
                    return await acUrlDocExt(id, docUrl, pubsub, db);
                },
                async acDocExtUrlUsuario(_: void, {id, usuario, docUrl}, {pubsub, db})
                {
                    return await acUrlDocExtUsuario(id, usuario, docUrl, pubsub, db);
                },
                async acObEstUsuario(_: void, {_id, usuario, observaciones, estatus}, {pubsub, db})
                {
                    return await actObsEstaPorUsuDocExt(_id, usuario, observaciones, estatus, pubsub, db);
                },
                async acEstEstGralUsuarioFolio(_: void, {_id, usuario, estatus, estatusGral, folio}, {pubsub, db})
                {
                    return await acEstEstGralFolioUsuario(_id, usuario, estatus, estatusGral, folio, pubsub, db);
                },
                async acDocResUrlEstatusPorIdDocExt(_: void, {_id, estatusGral, docRespUrl, folio}, {pubsub, db})
                {
                    return await acDocExtEstatusGralDocRepUrlFolio(_id, estatusGral, docRespUrl, folio, pubsub, db);
                },
                async acEstatusGralTerminado(_: void, {_id, estatusGral, acuseUrl, folio}, {pubsub, db})
                {
                    return await acEstatusGralEstatusUsuarioTerminado(_id, estatusGral, acuseUrl, folio, pubsub, db);
                },
                // =========================DOCUMENTACION INTERNA====================================
                async agDocInterna(_: void, {agNotificacion}, {pubsub, db, cadena})
                {
                    return await agDocumentoInterno(agNotificacion, pubsub, db);
                },
                async acDocVistoUsuario(_: void, {folioInterno, usuario}, {pubsub, db})
                {
                    return await acVistoUsuario(folioInterno, usuario, pubsub, db);
                }
            }
    };
export default mutation;
