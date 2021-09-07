// import {IResolvers} from "graphql-tools";
import {UsuarioMutationService} from "./services/usuario-mutation.service";
import {IResolvers} from "graphql-middleware/dist/types";
import {IUsuario} from "./models/usuario-interface";
import {Db} from "mongodb";
import {PubSub} from "graphql-subscriptions";

export const mutationUsuarios =
    {
        Mutation:
            {
                registroUsuario: async (_: object, a: { usuario: IUsuario }, p: { db: Db }) =>
                {
                    return await new UsuarioMutationService(_, {db: p.db})._registroUsuario(a.usuario);
                },

                actualizarRole: async (_: object, a: { _id: string, role: string, esActualizar: boolean }, p: { pubsub: PubSub, db: Db }) =>
                {
                    return await new UsuarioMutationService(_, {pubsub: p.pubsub, db: p.db})._actualizarRole(a._id, a.role, a.esActualizar);
                },

                actualizarContrasena: async (_: object, a: { usuario: string, actualContrasena: string, nvaContrasena: string, esAdmin: boolean }, p: { db: Db }) =>
                {
                    return await new UsuarioMutationService(_, {db: p.db})._actializarContrasena(a.usuario, a.actualContrasena, a.nvaContrasena, a.esAdmin);
                },
                eliminarUsuario: async (_: object, a: { _id: string }, p: { db: Db }) =>
                {
                    return await new UsuarioMutationService(_, {db: p.db})._eliminarUsuario(a._id);
                }
            }
    };
