import {IResolvers} from "graphql-tools";
import {buscarDeptoID, obtenerDeptos} from "../operaciones/querys/departamento.query";
import {
    loginUsuario,
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorSuNombreDeUsuario,
    perfilUsuario,
} from "../operaciones/querys/usuarios.query";
import {folioPorUsuario, folioUltimo, todosLosFolios} from "../operaciones/querys/folio.query";
import {
    docsPorUsuario,
    docsUsuarioEstatus,
    docsUsuarioEstatusPAR,
    todosDocsExternos
} from "../operaciones/querys/docExterna.query";
import {
    docInternaUsuarioVisto,
    todasNotificacionesDocInterna,
    todasNotificacionesUsuario
} from "../operaciones/querys/docInterna.query";

const query: IResolvers =
    {
        Query:
            {
                // DEPARTAMENTOS
                async obtenerDepartamentos(_: void, __: any, {db})
                {
                    return await obtenerDeptos(db)
                },
                async departamentoID(_: void, {_id}: any, {db})
                {
                    return await buscarDeptoID(_id, db);
                },
                // USUARIOS
                async obtenerUsuarios(_: void, __: any, {db})
                {
                    return await obtenerTodosLosUsuarios(db);
                },
                async buscarUsuario(_: any, {usuario}, {db})
                {
                    return await obtenerUsuarioPorSuNombreDeUsuario(usuario, db);
                },
                async login(_: void, {usuario, contrasena}, {db})
                {
                    return await loginUsuario(usuario, contrasena, db)
                },
                async perfil(_: void, __: any, {token})
                {
                    return await perfilUsuario(token);
                },
                // FOLIOS
                async obtenerFoliosTodos(_: void, __: void, {db})
                {
                    return await todosLosFolios(db);
                },
                async ultimoFolio(_: any, __: any, {db})
                {
                    return await folioUltimo(db);
                },
                async folioUsuario(_: void, {asigUsuario}, {db})
                {
                    return await folioPorUsuario(asigUsuario, db);
                },
                // DOCUMENTACION EXTERNA
                async todosDocumentosExternos(_: void, __: void, {db})
                {
                    return await todosDocsExternos(db);
                },
                async obDocsUsuarioExterno(_: void, {usuario}, {db})
                {
                    return await docsPorUsuario(usuario, db);
                },
                async obDocsUsuarioEstatus(_: void, {usuario, estatusGral}, {db}) {
                    return await docsUsuarioEstatus(usuario, estatusGral, db);
                },
                async obtenerDocsUsuarioStatusPAR(_: void, {dirigido}, {db})
                {
                    return await docsUsuarioEstatusPAR(dirigido, db);
                },
                // DOCUMENTACION INTERNA
                async obNotiDocInterna(_: void, __: void, {db})
                {
                    return await todasNotificacionesDocInterna(db);
                },
                async obNotiUsuario(_: void, {usuario}, {db})
                {
                    return await todasNotificacionesUsuario(usuario, db);
                },
                async obNotificacionesPorUsuarioYVisto(_: void, {usuario, visto}, {db})
                {
                    return await docInternaUsuarioVisto(usuario, visto, db);
                }
            },
    }
;
export default query;
