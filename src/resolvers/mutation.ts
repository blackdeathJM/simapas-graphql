import {IResolvers} from "graphql-tools";
import {actualizarDepto, registroDepto} from "../operaciones/mutations/departamento.mutation";
import {acPerfilUsuario, regUsuario} from "../operaciones/mutations/usuario.mutation";
import {acUrlFolio, registrarFolio} from "../operaciones/mutations/folio.mutation";
import {actObsEstaPorUsuDocExt, acUrlDocExt, acUrlDocExtUsuario, registroDoc} from "../operaciones/mutations/docExterna.mutation";
import {acVistoUsuario, agDocumentoInterno} from "../operaciones/mutations/docInterna.mutation";

const mutation: IResolvers =
    {
        Mutation:
            {
                // DEPARTAMENTO
                async registroDepartamento(_: void, {departamento}, {pubsub, db})
                {
                    return await registroDepto(departamento, pubsub, db);
                },
                async actualizarDepartamento(_: void, {nombreDeptoActualizar}, {db})
                {
                    return await actualizarDepto(nombreDeptoActualizar._id, nombreDeptoActualizar.nombre, db);
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
                async acUrlFolio(_: void, {id, archivoUrl}, {db}) {
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
                async acObEstUsuario(_: void, {docExterno}, {pubsub, db})
                {
                    return await actObsEstaPorUsuDocExt(docExterno, pubsub, db);
                },
                // =========================DOCUMENTACION INTERNA====================================
                async agDocInterna(_: void, {agNotificacion}, {pubsub, db})
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
