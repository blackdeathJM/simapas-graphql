import {PUB_SUB} from "../../config/global";
import {withFilter} from 'graphql-subscriptions';
import {IResolvers} from "graphql-middleware/dist/types";
import {pubsub} from "../../app";

export const usuarioSubscriptionResolver: IResolvers =
    {
        Subscription:
            {
                cambiarRoleUsuario:
                    {
                        subscribe: withFilter(() => pubsub.asyncIterator(PUB_SUB.NOT_CAMBIO_ROLE),
                            (payload, variables) =>
                            {
                                return payload.cambiarRoleUsuario.usuario === variables.usuario;
                            })
                    }
            }
    };
