import {IResolvers} from "graphql-tools";
import {PubSub} from 'apollo-server'
import {PUB_SUB} from "../../config/global";

const usuarioSubscriptionResolver: IResolvers =
    {
        Subscription:
            {
                cambiarRoleUsuario:
                    {
                        subscribe: (_, __, {pubsub}) =>
                        {
                            const subscripcion = pubsub as PubSub;
                            return subscripcion.asyncIterator([PUB_SUB.NOT_CAMBIO_ROLE])
                        }
                    }
            }
    };
export default usuarioSubscriptionResolver;
