// import {IResolvers} from "graphql-tools";
import UsuarioMutationService from "./services/usuario-mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_, {usuario}, {db})
                {
                    return new UsuarioMutationService(_, {db})._registroUsuario(usuario);
                },

                async actualizarRole(_, {_id, role, esActualizar}, {pubsub, db})
                {
                    return new UsuarioMutationService(_, {pubsub, db})._actualizarRole(_id, role, esActualizar);
                },

                async actualizarContrasena(_, {usuario, actualContrasena, nvaContrasena, esAdmin}, {db})
                {
                    return new UsuarioMutationService(_, {db})._actializarContrasena(usuario, actualContrasena, nvaContrasena, esAdmin);
                },
                async eliminarUsuario(_, {_id}, {db})
                {
                    return new UsuarioMutationService(_, {db})._eliminarUsuario(_id);
                }
            }
    };
export default mutationUsuarios;
