import {IResolvers} from "graphql-tools";
import {actualizarDepto, registroDepto} from "../operaciones/mutations/departamento.mutation";
import {actualizarPerfilUsuario, regUsuario} from "../operaciones/mutations/usuario.mutation";
import {registrarFolio} from "../operaciones/mutations/folio.mutation";
// import { ObjectId } from "bson";

const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {pubsub, db})
                {
                    return await registroDepto(departamento, pubsub, db);
                },
                async actualizarDepartamento(_: void, {nombreDeptoActualizar}, {db})
                {
                    return await actualizarDepto(nombreDeptoActualizar._id, nombreDeptoActualizar.nombre, db);
                },
                async registroUsuario(_: void, {usuario}, {db})
                {
                    return await regUsuario(usuario, db);
                },
                async actualizarUsuario(_: void, {usuario}, {db})
                {
                    return await actualizarPerfilUsuario(usuario.usuario, usuario.nombre, usuario.role, usuario.img, db);
                },
                async registroFolio(_: void, {folio}, {db})
                {
                    return await registrarFolio(folio, db);
                }
            }
    };
export default mutation;
