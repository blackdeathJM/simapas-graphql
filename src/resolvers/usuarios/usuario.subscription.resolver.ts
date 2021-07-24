import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../config/global";
import {withFilter} from 'graphql-subscriptions';

const usuarioSubscriptionResolver: IResolvers =
    {
        Subscription:
            {
                cambiarRoleUsuario:
                    {
                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator(PUB_SUB.NOT_CAMBIO_ROLE),
                            (payload, variables) =>
                            {
                                return payload.cambiarRoleUsuario.usuario === variables.usuario;
                            })
                    }
            }
    };
export default usuarioSubscriptionResolver;
