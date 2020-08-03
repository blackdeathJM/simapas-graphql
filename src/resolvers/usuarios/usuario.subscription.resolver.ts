import {IResolvers} from "graphql-tools";
import {withFilter} from 'apollo-server'
import {SUBSCRIPCIONES} from "../../config/global";

const usuarioSubscriptionResolver: IResolvers =
    {
        Subscription:
            {
                sessionUsuario:
                    {
                        /*                        subscribe: (_: void, __: void, {pubsub}) => {
                                                    return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_USUARIOS_SESSION]);
                                                }*/

                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator([SUBSCRIPCIONES.NOT_USUARIOS_SESSION]),
                            (payload, args) => {
                                console.log('payload', payload.sessionUsuario);
                                console.log('variables', args);
                                return true;
                            })
                    }

            }
    };
export default usuarioSubscriptionResolver;
