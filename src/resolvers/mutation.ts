import { IResolvers } from "graphql-tools";
import { actualizarDepto, registroDepto } from "../operaciones/mutations/departamento.mutation";
import { regUsuario } from "../operaciones/mutations/usuario.mutation";
import { ObjectId } from "bson";

const mutation: IResolvers =
{
    Mutation:
    {
        async registroDepartamento(_: void, { departamento }, { pubsub, db }) {
            return await registroDepto(departamento, pubsub, db);
        },
        async actualizarDepartamento(_: void, { nombreDeptoActualizar }, { db }) {
            return await actualizarDepto(nombreDeptoActualizar._id, nombreDeptoActualizar.nombre, db);
        },
        async registroUsuario(_: void, { usuario }, { db }) {
            return await regUsuario(usuario, db);
        }
    }
};
export default mutation;
