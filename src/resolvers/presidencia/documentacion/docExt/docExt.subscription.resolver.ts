// import {IResolvers} from "graphql-tools";
import {PUB_SUB} from "../../../../config/global";
import {PubSub, withFilter} from 'graphql-subscriptions';
import {IDocExt} from "./models/docExt.interface";
import {IResolvers} from "graphql-middleware/dist/types";

let filtro: boolean = false;
// const pubsub: PubSub = new PubSub();

export const docExtSubscription: IResolvers =
    {
        Subscription:
            {
                todosDocsExtSub:
                    {
                        subscribe: (_, __, {pubsub}) =>
                        {
                            const sub = pubsub as PubSub;
                            console.log('------', pubsub);
                            return sub.asyncIterator([PUB_SUB.DOC_EXT]);
                        }
                        // subscribe: (_, __, {pubsub}) => pubsub.asyncIterator([PUB_SUB.DOC_EXT]),
                    },
                docSubProceso:
                    {
                        subscribe: withFilter((_: void, __: void, {pubsub}) => pubsub.asyncIterator(PUB_SUB.DOC_EXT_SUB_PROCESO),
                            (payload, variables) =>
                            {
                                payload.docSubProceso.forEach((d: IDocExt) =>
                                {
                                    d.usuarioDestino.forEach(value =>
                                    {
                                        filtro = value.usuario === variables.usuario;
                                    })
                                });
                                return filtro;
                            })
                    }
            }
    };
