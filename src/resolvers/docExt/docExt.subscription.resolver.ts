import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../config/global";
import {PubSub} from "apollo-server-express";

const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExtSub:
                    {
                        subscribe: (_, __, {pubsub}) =>
                        {
                            const subscripcion = pubsub as PubSub;
                            return subscripcion.asyncIterator([PUB_SUB.DOC_EXT]);
                        }
                    }
            }
    };
export default docExtSubscription;
