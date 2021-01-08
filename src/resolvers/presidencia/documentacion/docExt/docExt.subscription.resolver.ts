import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../../../config/global";
import {PubSub, withFilter} from "apollo-server-express";
import {IUsuarioDestinoDocExt} from "./models/docExt.interface";

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
                docSubProceso:
                    {
                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_USUSUBPROCESO),
                            (payload, variables) =>
                            {
                                console.log('payload', payload, variables);
                                return true
                            })
                    }
            }
    };
export default docExtSubscription;
