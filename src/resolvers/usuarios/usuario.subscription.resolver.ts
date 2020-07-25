import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../../config/global";

const usuarioSubscriptionResolver: IResolvers =
    {
        Subscription:
            {
                sessionUsuario:
                    {
                        subscribe: (_: void, __: void, {pubsub}) => {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_USUARIOS_SESSION]);
                        }
                    }
            }
    };
export default usuarioSubscriptionResolver;
