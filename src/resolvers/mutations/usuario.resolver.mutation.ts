import {IResolvers} from "graphql-tools";
import {regUsuario} from "../../operaciones/mutations/usuario.mutation";

const mutationUsuario: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_: void, {usuario}, {db})
                {
                    return await regUsuario(usuario, db);
                }
            }
    };
export default mutationUsuario;
