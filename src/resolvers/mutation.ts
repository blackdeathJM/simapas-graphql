import {IResolvers} from "graphql-tools";
import {actualizarDepto, registroDepto} from "../operaciones/mutations/departamento.mutation";
import {actualizarPerfilUsuario, regUsuario} from "../operaciones/mutations/usuario.mutation";
import {registrarFolio} from "../operaciones/mutations/folio.mutation";
import {agregarDocSeguimiento} from "../operaciones/mutations/segDocumentacion.mutation";

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
                    return await actualizarPerfilUsuario(usuario.usuario, usuario.nombre, usuario.img, db);
                },
                // FOLIO
                async registroFolio(_: void, {folio}, {db})
                {
                    return await registrarFolio(folio, db);
                },
                // SEGUIMIENTO DOCUMENTACION
                async registroSegDocumentacion(_: void, {regDocumentacion}, {db})
                {
                    return await agregarDocSeguimiento(regDocumentacion, db);
                }
            }
    };
export default mutation;
