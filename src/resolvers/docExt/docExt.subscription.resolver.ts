import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../../config/global";
import {PubSub} from "apollo-server-express";

const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExt:
                    {
                        subscribe: (_, __, {pubsub}) => {
                            const subscripcion = pubsub as PubSub;
                            return subscripcion.asyncIterator([SUBSCRIPCIONES.NOT_DOC_EXTERNA]);
                        }
                    }
            }
    };
export default docExtSubscription;
