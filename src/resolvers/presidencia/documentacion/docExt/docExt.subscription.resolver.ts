import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../../../config/global";
import {PubSub, withFilter} from "apollo-server-express";
import {IDocExt} from "./models/docExt.interface";

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
                        subscribe: withFilter((_: void, __: any, {pubsub}) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_USUSUBPROCESO),
                            (payload, variables) =>
                            {
                                return payload.docSubProceso.filter((v: IDocExt) =>
                                {
                                    v.usuarioDestino.filter(u => u.usuario === variables.usuario)
                                })
                            })
                    }
            }
    };
export default docExtSubscription;
