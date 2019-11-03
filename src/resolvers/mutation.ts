import {IResolvers} from "graphql-tools";
import {registroDepto} from "../operaciones/mutations/departamento.mutation";
import {regUsuario} from "../operaciones/mutations/usuario.mutation";


const mutation: IResolvers =
    {
        Mutation:
            {
                async registroDepartamento(_: void, {departamento}, {pubsub, db})
                {
                    return await registroDepto(departamento, pubsub, db);
                },
                async registroUsuario(_: void, {usuario}, {db})
                {
                    return await regUsuario(usuario, db);
                }
            }
    };
export default mutation;
