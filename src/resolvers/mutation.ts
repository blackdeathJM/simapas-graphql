import {IResolvers} from "graphql-tools";
import {actualizarDepto, registroDepto} from "../operaciones/mutations/departamento.mutation";
import {regUsuario} from "../operaciones/mutations/usuario.mutation";


const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {pubsub, db})
                {
                    return await registroDepto(departamento, pubsub, db);
                },
                async actualizarDepartamento(_: void, {_id, nombreDeptoActualizar}, {db})
                {
                    return await actualizarDepto(_id, nombreDeptoActualizar, db);
                },
                async registroUsuario(_: void, {usuario}, {db})
                {
                    return await regUsuario(usuario, db);
                }
            }
    };
export default mutation;
