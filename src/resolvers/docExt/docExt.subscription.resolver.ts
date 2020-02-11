import {IResolvers} from "graphql-tools";
import {SUBSCRIPCIONES} from "../../config/constants";

const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExt:
                    {
                        subscribe: (_: void, __: void, {pubsub}) =>
                        {
                            return pubsub.asyncIterator([SUBSCRIPCIONES.NOT_DOC_EXTERNA]);
                        }
                    }
            }
    };
export default docExtSubscription;
