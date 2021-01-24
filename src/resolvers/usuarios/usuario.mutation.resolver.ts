import {IResolvers} from "graphql-tools";
import UsuarioMutationService from "./services/usuario-mutation.service";

const mutationUsuarios: IResolvers =
    {
        Mutation:
            {
                async registroUsuario(_, {usuario}, {db})
                {
                    return new UsuarioMutationService(_, {}, {db})._registroUsuario(usuario);
                },

                async actualizarRole(_, {_id, role}, {pubsub, db})
                {
                    return new UsuarioMutationService(_, {}, {pubsub, db})._actualizarRole(_id, role);
                },

                async actualizarContrasena(_, {usuario, actualContrasena, nvaContrasena}, {db})
                {
                    return new UsuarioMutationService(_, {}, {db})._actializarContrasena(usuario, actualContrasena, nvaContrasena);
                },

                async actualizarImgPerfil(_, {usuario, img}, {db})
                {
                    return new UsuarioMutationService(_, {usuario, img}, {db}).actualizarImgAvatar();
                },

                async eliminarUsuario(_, {_id}, {db})
                {
                    return new UsuarioMutationService(_, {_id}, {db}).EliminarUsuario();
                }
            }
    };
export default mutationUsuarios;
