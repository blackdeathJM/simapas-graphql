import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../../../config/global";
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
                    },
                pubsubSubproceso:
                    {
                        subscribe: (_, __, {pubsub}) =>
                        {
                            const subscripcion = pubsub as PubSub;
                            return subscripcion.asyncIterator([PUB_SUB.DOC_EXT_USUSUBPROCESO]);
                        }
                    },
                // docSubProceso:
                //     {
                //         subscribe: withFilter((_: void, __: any, {pubsub}) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_USUSUBPROCESO),
                //             (payload, variables) =>
                //         {
                //             return payload.docSubProceso._id === variables._id;
                //         })
                //     }
            }
    };
export default docExtSubscription;
